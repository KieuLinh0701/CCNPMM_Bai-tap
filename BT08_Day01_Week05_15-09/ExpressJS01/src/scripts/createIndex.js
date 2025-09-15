// scripts/createIndex.js
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'Lav_VOQajT6IyHo0InXz', 
  },
  tls: { rejectUnauthorized: false },
});

async function createIndex() {
  try {
    const exists = await client.indices.exists({ index: 'products' });
    if (!exists) {
      await client.indices.create({
        index: 'products',
        body: { body: {
          settings: {
            analysis: {
              analyzer: {
                folding: {
                  tokenizer: 'standard',
                  filter: ['lowercase', 'asciifolding']
                }
              }
            }
          },
          settings: {
            analysis: {
              analyzer: {
                folding: {
                  tokenizer: 'standard',
                  filter: ['lowercase', 'asciifolding']
                }
              }
            }
          },
          mappings: {
            properties: {
              name: { type: 'text' },          // tìm kiếm
              price: { type: 'double' },       // giá
              description: { type: 'text' },   // mô tả
              category: { type: 'keyword' },   // phân loại
              image: { type: 'text', index: false }, // ảnh, không cần search
              views: { type: 'integer' },      // lượt xem
            }
          }
        }}
      });
      console.log('✅ Index "products" created');
    } else {
      console.log('ℹ️ Index "products" đã tồn tại');
    }
  } catch (err) {
    console.error('❌ Lỗi tạo index:', err);
  }
}

createIndex();