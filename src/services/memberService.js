const db = require('./db');
const Member = require('../models/Member');

async function getMemberByMid(mid) {
  const result = await db.query('SELECT * FROM `ms_member` WHERE `mid` = ?', [mid]);
  return result ? new Member(result[0]) : null;
}

async function getMembers() {
  const results = await db.query('SELECT * FROM `ms_member`');
  return results ? results.map((member) => new Member(member)) : [];
}

module.exports = {
  getMemberByMid,
  getMembers,
};
