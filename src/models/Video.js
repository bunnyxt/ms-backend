const memberService = require('../services/memberService');
const recordService = require('../services/recordService');

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
  
  records() {
    return recordService.getRecordsByBvid(this.bvid);
  }
}

module.exports = Video;
