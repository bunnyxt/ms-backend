/* eslint-disable prefer-template,quote-props */
const db = require('./db');
const Record = require('../models/Record');
const { buildSetSql } = require('../utils/sql');

async function getRecordById(id) {
  const result = await db.query('SELECT * FROM `ms_record` WHERE `id` = ?', [id]);
  return result.length > 0 ? new Record(result[0]) : null;
}

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

async function updateRecord(
  id, threshold, preciseValue, time, timespan, srcType, srcAuthor, srcUrl, remark,
) {
  const { setNameString, setValueList } = buildSetSql({
    'threshold': threshold,
    'precise_value': preciseValue,
    'time': time,
    'timespan': timespan,
    'src_type': srcType,
    'src_author': srcAuthor,
    'src_url': srcUrl,
    'remark': remark,
  });
  await db.query(
    'UPDATE `ms_record` SET ' + setNameString + ' WHERE `id` = ?',
    [...setValueList, id],
  );
  return getRecordById(id);
}

module.exports = {
  getRecordById,
  updateRecord,
  getRecordsByBvid,
  addRecord,
};
