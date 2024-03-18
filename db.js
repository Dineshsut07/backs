import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dinesh123',
  database: 'blog',
});

export { db };
