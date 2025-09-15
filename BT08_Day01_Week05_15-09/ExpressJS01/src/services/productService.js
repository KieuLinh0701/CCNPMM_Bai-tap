const { Client } = require('@elastic/elasticsearch');
const Product = require('../models/product');
const User = require('../models/user');

const esClient = new Client({
  node: 'https://localhost:9200',
  auth: { username: 'elastic', password: 'Lav_VOQajT6IyHo0InXz' },
  tls: { rejectUnauthorized: false }
});

/**
 * Tìm kiếm sản phẩm trong Elasticsearch
 */
const searchProducts = async ({ category, search, priceMin, priceMax, sortViews, page = 1, limit = 3 }) => {
  const must = [];

  if (search) {
    if (search) {
      must.push({
        match: {
          name: {
            query: search,
            fuzziness: "AUTO" 
          }
        }
      });
    }
  }

  if (category && category !== 'All') {
    must.push({ term: { category } });
  }

  if (priceMin || priceMax) {
    must.push({ range: { price: { gte: priceMin || 0, lte: priceMax || 50 } } });
  }

  const sort = [];
  if (sortViews) {
    sort.push({ views: sortViews === 'asc' ? 'asc' : 'desc' });
  }

  const response = await esClient.search({
    index: 'products',
    body: { query: { bool: { must } }, from: (page - 1) * limit, size: limit, sort }
  });

  const data = response.hits.hits.map(hit => ({ _id: hit._id, ...hit._source }));

  return {
    data,
    total: response.hits.total.value,
    currentPage: page,
    totalPages: Math.ceil(response.hits.total.value / limit)
  };
};

/**
 * Ghi nhận lượt xem sản phẩm
 * @param {string} userId - ID của user đang xem
 * @param {string} productId - ID sản phẩm
 */
const recordProductView = async (userId, productId) => {
  try {
    // 1. Cập nhật views + lưu user vào viewedBy
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $inc: { views: 1 },
        $addToSet: { viewedBy: userId } // tránh duplicate
      },
      { new: true }
    );

    if (!updatedProduct) {
      throw new Error('Không tìm thấy sản phẩm');
    }

    // 2. Cập nhật danh sách viewedProducts của user
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { viewedProducts: productId } }
    );

    return updatedProduct;
  } catch (error) {
    console.error('Lỗi khi ghi nhận lượt xem:', error);
    throw new Error('Không thể ghi nhận lượt xem sản phẩm');
  }
};

module.exports = {
  searchProducts,
  recordProductView
};