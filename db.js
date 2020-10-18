// config in .env
require('dotenv').config();

const mysql = require('mysql');

class MysqlClient {
  constructor(options) {
    this.pool = mysql.createPool(options);
    console.log(`MySQL pools created with options ${JSON.stringify(options)}`)
  }

  query(sql, values = [], options = {}) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, conn) => {
        if (err) {
          return reject(err);
        }
        conn.query({
          ...options,  // avoid options override sql and values
          sql,
          values,
        }, (err, results, fields) => {
          conn.release();
          if (err) {
            return reject(err);
          }
          return resolve(results || null);
        })
      })
    });
  }
}

const options = {
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}

module.exports = new MysqlClient(options);
