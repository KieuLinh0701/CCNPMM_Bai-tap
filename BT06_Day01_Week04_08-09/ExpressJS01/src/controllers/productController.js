const Product = require('../models/product');
const { searchProducts } = require('../services/productService');

const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching categories" });
  }
};

const searchProductsController = async (req, res) => {
  try {
    const result = await searchProducts(req.query);
    res.json(result);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Lỗi tìm kiếm sản phẩm' });
  }
};

module.exports = {
  getCategories,
  searchProducts: searchProductsController
};