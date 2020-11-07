const { removeSecond } = require('../../utils/index');
const videoService = require('../../services/videoService');
const recordService = require('../../services/recordService');

async function addRecord({ input }) {
  // params check
  const {
    threshold, preciseValue, srcType, srcAuthor, srcUrl, remark,
  } = input;
  
  if (preciseValue < threshold) {
    throw Error(`preciseValue (${preciseValue}) should not less than threshold (${threshold})`);
  }
  
  let { time } = input;
  time = removeSecond(time);
  
  const { bvid } = input;
  const video = await videoService.getVideoByBvid(bvid);
  if (!video) {
    throw Error(`video BV${bvid} not added yet`);
  }
  
  const records = await recordService.getRecordsByBvid(bvid);
  if (records.find((record) => record.threshold === threshold)) {
    throw Error(`video BV${bvid} already add record with threshold ${threshold}`);
  }
  
  const timespan = time - removeSecond(video.pubdate);
  if (timespan < 0) {
    throw Error(`record time (${time}) should not before video pubdate (${removeSecond(video.pubdate)})`);
  }
  // params check done
  
  const record = await recordService.addRecord(
    bvid, threshold, preciseValue, time, timespan, srcType, srcAuthor, srcUrl, remark,
  );
  if (record) {
    // TODO add log
  } else {
    // TODO add log, maybe unreachable? what about error log above?
  }
  
  return record;
}

module.exports = {
  addRecord,
};
