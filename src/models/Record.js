class Record {
  constructor({
    id, bvid, threshold, preciseValue, time, timespan, srcType, srcAuthor, srcUrl, remark,
  }) {
    this.id = id;
    this.bvid = bvid;
    this.threshold = threshold;
    this.preciseValue = preciseValue;
    this.time = time;
    this.timespan = timespan;
    this.srcType = srcType;
    this.srcAuthor = srcAuthor;
    this.srcUrl = srcUrl;
    this.remark = remark;
  }
}

module.exports = Record;
