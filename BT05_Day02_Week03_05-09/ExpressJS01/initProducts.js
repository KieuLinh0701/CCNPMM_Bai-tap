require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/product.js'); 
const connection = require('./src/config/database.js'); 

const initProducts = async () => {
  await connection();

  const sampleProducts = [
    {
      name: 'Áo thun nam cổ tròn',
      price: 15,
      description: 'Áo thun cotton mềm mại, thoáng mát',
      category: 'clothing',
      image: 'https://i.imgur.com/i6jJToF.jpeg',
    },
    {
      name: 'Áo sơ mi nữ tay dài',
      price: 25,
      description: 'Áo sơ mi nữ thanh lịch, chất liệu vải cao cấp',
      category: 'clothing',
      image: 'https://product.hstatic.net/200000588593/product/2sp23s051-ao-so-mi-kieu-nu-1_acebe91855e947c6a223af2f8406ddc2_master.jpg',
    },
    {
      name: 'Quần jean nam',
      price: 30,
      description: 'Quần jean form dáng chuẩn, bền màu',
      category: 'clothing',
      image: 'https://cf.shopee.vn/file/vn-11134207-7qukw-lhd44187zoz6c6',
    },
    {
      name: 'Váy liền nữ',
      price: 35,
      description: 'Váy liền nữ kiểu dáng trẻ trung, thoải mái',
      category: 'clothing',
      image: 'https://filebroker-cdn.lazada.vn/kf/Se68dca658cc047b9bbf5a621c10a45845.jpg',
    }
  ];

  try {
    await Product.deleteMany(); // Xóa hết dữ liệu cũ
    const result = await Product.insertMany(sampleProducts);
    console.log(`Đã thêm ${result.length} sản phẩm.`);
  } catch (error) {
    console.error('Lỗi khi thêm dữ liệu:', error);
  } finally {
    mongoose.connection.close(); 
  }
};

initProducts();