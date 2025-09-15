const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({
  node: 'https://localhost:9200',
  auth: { username: 'elastic', password: 'Lav_VOQajT6IyHo0InXz' },
  tls: { rejectUnauthorized: false }
});

/**
 * Tìm kiếm sản phẩm trong Elasticsearch
 */
const searchProducts = async ({ category, search, priceMin, priceMax, sortViews, page = 1, limit = 3 }) => {
  const must = [];

  if (search) {
    if (search) {
      must.push({
        match: {
          name: {
            query: search,
            fuzziness: "AUTO" 
          }
        }
      });
    }
  }

  if (category && category !== 'All') {
    must.push({ term: { category } });
  }

  if (priceMin || priceMax) {
    must.push({ range: { price: { gte: priceMin || 0, lte: priceMax || 50 } } });
  }

  const sort = [];
  if (sortViews) {
    sort.push({ views: sortViews === 'asc' ? 'asc' : 'desc' });
  }

  const response = await esClient.search({
    index: 'products',
    body: { query: { bool: { must } }, from: (page - 1) * limit, size: limit, sort }
  });

  const data = response.hits.hits.map(hit => ({ _id: hit._id, ...hit._source }));

  return {
    data,
    total: response.hits.total.value,
    currentPage: page,
    totalPages: Math.ceil(response.hits.total.value / limit)
  };
};

module.exports = {
  searchProducts
};