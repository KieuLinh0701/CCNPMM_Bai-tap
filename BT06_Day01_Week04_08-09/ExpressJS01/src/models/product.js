const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String, 
  image: String,
  views: { type: Number, default: 0 },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;