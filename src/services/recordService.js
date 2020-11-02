const db = require('./db');
const Record = require('../models/Record');

async function getRecordsByBvid(bvid) {
  const results = await db.query('SELECT * FROM `ms_record` WHERE `bvid` = ?', [bvid]);
  return results.map((record) => new Record(record));
}

async function addRecord(
  bvid, threshold, preciseValue, time, timespan, srcType, srcAuthor, srcUrl, remark,
) {
  await db.query(
    'INSERT INTO `ms_record` (`bvid`, `threshold`, `precise_value`, `time`, `timespan`, '
    + '`src_type`, `src_author`, `src_url`, `remark`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [bvid, threshold, preciseValue, time, timespan, srcType, srcAuthor, srcUrl, remark],
  );
  const result = db.query('SELECT * from `ms_record` WHERE `bvid` = ? and `threshold` = ?', [bvid, threshold]);
  return result.length > 0 ? new Record(result[0]) : null;
}

module.exports = {
  getRecordsByBvid,
  addRecord,
};
