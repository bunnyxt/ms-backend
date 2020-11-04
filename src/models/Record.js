const dateFormat = require('dateformat');
const { addPaddingZero } = require('../utils/index')

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
  
  timeStr({ format = 'yyyy-mm-dd HH:MM' }) {
    return dateFormat(new Date(this.time * 1000), format);
  }
  
  timespanStr({ yearFormat = false, paddingZero = false }) {
    const days = Math.floor(this.timespan / (24 * 60 * 60));
    const hours = Math.floor((this.timespan - days * (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((this.timespan - days * (24 * 60 * 60) - hours * (60 * 60)) / 60);
    let prefixStr = `${paddingZero ? addPaddingZero(days, 4) : days}日`;
    if (yearFormat) {
      // TODO consider lunar year?
      const years = Math.floor(days / 365);
      const daysLeft = days % 365;
      prefixStr = `${years}年${daysLeft}日`;
    }
    const suffixStr = `${
      paddingZero ? addPaddingZero(hours, 2) : hours
    }时${
      paddingZero ? addPaddingZero(minutes, 2) : minutes
    }分`;
    return `${prefixStr}${suffixStr}`;
  }
}

module.exports = Record;
