const Product = require('../models/product');
const { Client } = require('@elastic/elasticsearch');

// Kết nối Elasticsearch
const esClient = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'Lav_VOQajT6IyHo0InXz', 
  },
  tls: { rejectUnauthorized: false }
});

// Lấy danh sách category duy nhất từ MongoDB
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err.message);
    res.status(500).json({ message: "Server error while fetching categories" });
  }
};

// Tìm kiếm sản phẩm (có fuzzy search)
const searchProducts = async (req, res) => {
  try {
    const { category, search, priceMin, priceMax, sortViews, page = 1, limit = 3 } = req.query;

    const must = [];

    if (search) {
      if (search.length < 3) {
        must.push({ 
          wildcard: { 
            name: `*${search.toLowerCase()}*` 
          } 
        });
      } else {
        must.push({
          fuzzy: {
            name: {
              value: search,
              fuzziness: "AUTO"
            }
          }
        });
      }
    }

    // Lọc theo category
    if (category && category !== 'All') {
      must.push({ term: { category } });
    }

    // Lọc theo giá
    if (priceMin || priceMax) {
      must.push({
        range: {
          price: { gte: priceMin || 0, lte: priceMax || 1000000 }
        }
      });
    }

    // Sort
    const sort = [];
    if (sortViews) {
      sort.push({ views: sortViews === 'asc' ? 'asc' : 'desc' });
    }

    // Query Elasticsearch
    const response = await esClient.search({
      index: 'products',
      body: {
        query: {
          bool: { must }
        },
        from: (page - 1) * limit,
        size: limit,
        sort
      },
    });

    const data = response.hits.hits.map(hit => ({
      _id: hit._id,
      ...hit._source
    }));

    res.json({
      data,
      total: response.hits.total.value,
      currentPage: page,
      totalPages: Math.ceil(response.hits.total.value / limit)
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Lỗi tìm kiếm sản phẩm' });
  }
};

module.exports = {
  getCategories,
  searchProducts,
};