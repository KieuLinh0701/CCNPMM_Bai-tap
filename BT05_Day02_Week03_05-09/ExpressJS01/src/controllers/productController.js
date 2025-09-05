const Product = require('../models/product');

// Lấy sản phẩm theo category, có phân trang
const getProductsByCategory = async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page);
  const pageSize = parseInt(limit);

  const skip = (pageNumber - 1) * pageSize;

  // Filter: nếu category tồn tại thì filter, không thì lấy tất cả
  const filter = category ? { category } : {};

  try {
    const [products, totalItems] = await Promise.all([
      Product.find(filter).skip(skip).limit(pageSize),
      Product.countDocuments(filter),
    ]);

    res.status(200).json({
      data: products,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalItems / pageSize),
      totalItems,
    });
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

// Lấy danh sách category duy nhất
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.status(200).json({ categories });
  } catch (err) {
    console.error('Error fetching categories:', err.message);
    res.status(500).json({ message: "Server error while fetching categories" });
  }
};

module.exports = {
  getProductsByCategory,
  getCategories,
};