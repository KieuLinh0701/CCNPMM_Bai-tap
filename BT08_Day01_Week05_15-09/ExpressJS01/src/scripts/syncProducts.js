// scripts/syncProducts.js
const mongoose = require('mongoose');
const { Client } = require('@elastic/elasticsearch');
const Product = require('../models/product'); 

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/fullstack02', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); 

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'Lav_VOQajT6IyHo0InXz',
  },
  tls: { rejectUnauthorized: false },
});

async function syncMongoToES() {
  try {
    const products = await Product.find();
    console.log(`🔄 Sync ${products.length} sản phẩm...`);

    for (const product of products) {
      await client.index({
        index: 'products',
        id: product._id.toString(),
        body: {
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          views: product.views || 0,
        }
      });
    }

    await client.indices.refresh({ index: 'products' });
    console.log('✅ Sync xong!');
  } catch (err) {
    console.error('❌ Lỗi sync:', err);
  } finally {
    mongoose.disconnect();
  }
}

syncMongoToES();