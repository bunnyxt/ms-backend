// config in .env
require('dotenv').config();

const mysql = require('mysql');

class MysqlClient {
  constructor(options) {
    this.pool = mysql.createPool(options);
    console.log(`MySQL pools created with options ${JSON.stringify(options)}`);
  }
  
  /**
   * Do a query operation on MySQL db.
   * @param sql The sql string of query, support `?` placeholder.
   * @param values Values array to fill up `?` placeholders in sql string.
   * @param options Node package mysql query options.
   * @param enableCamelCaseFieldMapper Enable result field name mapping,
   * from kebab case to camel case.
   * @param customFieldMapper Custom result field name mapper for field name mapping.
   * @returns {Promise<List>} List of returned rows, raw js objects.
   */
  query(
    sql, values = [], options = {},
    enableCamelCaseFieldMapper = true, customFieldMapper = {},
  ) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line consistent-return
      this.pool.getConnection((connErr, conn) => {
        if (connErr) {
          return reject(connErr);
        }
        conn.query({
          ...options, // avoid options override sql and values
          sql,
          values,
        }, (queryErr, results, fields) => {
          conn.release();
          if (queryErr) {
            return reject(queryErr);
          }
          
          // RowDataPacket -> raw js object, map field name
          
          /**
           * Transform a given kebab case string into camel case.
           * @param kebabStr The kebab case string.
           * @returns {string} The camel case string transformed from kebabStr.
           */
          function kebabCaseToCamelCase(kebabStr) {
            let camelStr = '';
            const len = kebabStr.length;
            let underlineCount = 0;
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < len; i++) {
              let c = kebabStr.charAt(i);
              if (c === '_') {
                underlineCount += 1;
              } else if (underlineCount === 1) {
                c = c.toUpperCase();
                underlineCount = 0;
                camelStr = camelStr.substring(0, camelStr.length - 1);
              }
              camelStr += c;
            }
            return camelStr;
          }
          
          // build field mapper, consider custom field names and to camel case
          const fieldMapper = fields.reduce(
            (prev, curr) => ({
              ...prev,
              // eslint-disable-next-line no-nested-ternary
              [curr.name]: customFieldMapper[curr.name]
                ? customFieldMapper[curr.name] // use custom field name
                : enableCamelCaseFieldMapper
                  ? kebabCaseToCamelCase(curr.name) // kebab case to camel case
                  : curr.name,
            }),
            {},
          );
          
          // use field mapper to transform result list
          const returnResults = results.map((result) => Object.entries(fieldMapper).reduce(
            (prev, [field, renamedField]) => ({
              ...prev,
              [renamedField]: result[field],
            }), {},
          ));
          
          return resolve(returnResults); // maybe `resolve(returnResults || null)`?
        });
      });
    });
  }
}

const options = {
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

module.exports = new MysqlClient(options);
