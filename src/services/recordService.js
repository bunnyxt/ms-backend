const db = require('./db');
const Record = require('../models/Record');

async function getRecordsByBvid(bvid) {
  const results = await db.query('SELECT * FROM `ms_record` WHERE `bvid` = ?', [bvid]);
  return results ? results.map((record) => new Record(record)) : [];
}

module.exports = {
  getRecordsByBvid,
};
