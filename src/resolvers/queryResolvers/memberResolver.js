const memberService = require('../../services/memberService');

async function member({ mid }) {
  return memberService.getMemberByMid(mid);
}

module.exports = {
  member,
};
