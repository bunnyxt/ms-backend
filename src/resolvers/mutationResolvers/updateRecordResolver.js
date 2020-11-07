const { removeSecond, allUndefined } = require('../../utils/index');
const videoService = require('../../services/videoService');
const recordService = require('../../services/recordService');

async function updateRecord({ id, input }) {
  // params check
  const {
    threshold, preciseValue, srcType, srcAuthor, srcUrl, remark,
  } = input;
  
  let { time } = input;
  if (time) {
    time = removeSecond(time);
  }
  
  if (allUndefined([threshold, preciseValue, time, srcType, srcAuthor, srcUrl, remark])) {
    throw Error('require at least one field to be updated');
  }
  
  const record = await recordService.getRecordById(id);
  if (!record) {
    throw Error(`record id ${id} not exist`);
  }
  
  const newThreshold = threshold || record.threshold;
  const newPreciseValue = preciseValue || record.preciseValue;
  if (newPreciseValue < newThreshold) {
    throw Error(`preciseValue (${newPreciseValue}) should not less than threshold (${newThreshold})`);
  }
  
  const { bvid } = record;
  const video = await videoService.getVideoByBvid(bvid);
  if (!video) {
    throw Error(`video BV${bvid} not added yet`);
  }
  
  const newTime = time || record.time;
  const newTimespan = newTime - removeSecond(video.pubdate);
  if (newTimespan < 0) {
    throw Error(`record time (${newTime}) should not before video pubdate (${removeSecond(video.pubdate)})`);
  }
  // params check done
  
  const updatedRecord = await recordService.updateRecord(
    id, threshold, preciseValue, time, newTimespan, srcType, srcAuthor, srcUrl, remark,
  );
  if (updatedRecord) {
    // TODO add log
  } else {
    // TODO add log, maybe unreachable? what about error log above?
  }
  
  return updatedRecord;
}

module.exports = {
  updateRecord,
};
