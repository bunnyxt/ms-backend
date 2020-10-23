const videoService = require('../services/videoService');
const memberService = require('../services/memberService');

const root = {
  async video({ bvid }) {
    return videoService.getVideoByBvid(bvid);
  },
  async videos({ filter = {} }) {
    return videoService.getVideos(filter);
  },
  async member({ mid }) {
    return memberService.getMemberByMid(mid);
  },
  async members() {
    return memberService.getMembers();
  },
};

module.exports = root;
