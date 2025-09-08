// src/config/elasticsearch.js
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'Lav_VOQajT6IyHo0InXz', 
  },
  tls: { rejectUnauthorized: false } 
});

export default client;