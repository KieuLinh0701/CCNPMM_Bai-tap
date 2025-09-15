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
    res.status(500).json({ message: 'Lỗi tìm kiếm sản phẩm' });
  }
};

const recordProductView = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'Thiếu userId' });
    }

    const result = await recordProductView(userId, productId);
    res.status(200).json({
      message: 'Ghi nhận lượt xem thành công',
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  searchProducts: searchProductsController,
  recordProductView
};