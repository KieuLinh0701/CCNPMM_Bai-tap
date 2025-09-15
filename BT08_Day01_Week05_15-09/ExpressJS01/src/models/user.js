const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'customer' }, 

  // Danh sách sản phẩm yêu thích
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  // Danh sách sản phẩm đã xem
  viewedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;