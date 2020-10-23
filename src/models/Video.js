const memberService = require('../services/memberService');

class Video {
  constructor({
    id, bvid, titleAlias, pubdate, mid,
  }) {
    this.id = id;
    this.bvid = bvid;
    this.titleAlias = titleAlias;
    this.pubdate = pubdate;
    this.mid = mid;
  }
  
  owner() {
    return memberService.getMemberByMid(this.mid);
  }
}

module.exports = Video;
