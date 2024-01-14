const { Client } = require('pg');

const client = new Client({
    user: 'whvezcgt',
    host: 'cornelius.db.elephantsql.com',
    database: 'whvezcgt',
    password: 'Uj-HIhvRwQWv_3cYuh6qgVwBDr8NzIOF',
    port: 5432,
  });
  
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL:', err));
  