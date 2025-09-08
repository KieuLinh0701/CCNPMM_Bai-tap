const mongoose = require('mongoose');
const Product = require('./src/models/product.js'); 
const connection = require('./src/config/database.js'); 

const addViewsToExistingProducts = async () => {
  await connection();

  try {
    const result = await Product.updateMany(
      { views: { $exists: false } }, // chỉ update nếu chưa có field views
      { $set: { views: 0 } }
    );
    console.log(`Đã cập nhật ${result.modifiedCount} sản phẩm với field views.`);
  } catch (error) {
    console.error('Lỗi khi cập nhật views:', error);
  } finally {
    mongoose.connection.close();
  }
};

addViewsToExistingProducts();