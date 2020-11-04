class RecordAddInput {
  constructor({
    bvid, threshold, preciseValue, time, srcType, srcAuthor, srcUrl, remark,
  }) {
    this.bvid = bvid;
    this.threshold = threshold;
    this.preciseValue = preciseValue;
    this.time = time;
    this.srcType = srcType;
    this.srcAuthor = srcAuthor;
    this.srcUrl = srcUrl;
    this.remark = remark;
  }
}

module.exports = RecordAddInput;
