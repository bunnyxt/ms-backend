const memberService = require('../../services/memberService');

async function members() {
  return memberService.getMembers();
}

module.exports = {
  members,
};
