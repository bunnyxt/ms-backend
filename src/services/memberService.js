const db = require('./db');
const Member = require('../models/Member');

async function getMemberByMid(mid) {
  const result = await db.query('SELECT * FROM `ms_member` WHERE `mid` = ?', [mid]);
  return result.length > 0 ? new Member(result[0]) : null;
}

async function getMembers() {
  const results = await db.query('SELECT * FROM `ms_member`');
  return results.map((member) => new Member(member));
}

async function addMember(mid, name) {
  await db.query('INSERT INTO `ms_member` (`mid`, `name`) VALUES (?, ?)', [mid, name]);
  return getMemberByMid(mid);
}

module.exports = {
  getMemberByMid,
  getMembers,
  addMember,
};
