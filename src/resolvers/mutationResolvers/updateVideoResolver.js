const videoService = require('../../services/videoService');
const { allUndefined } = require('../../utils/index');

async function updateVideo({ bvid, input }) {
  // params check
  const { titleAlias } = input;
  if (allUndefined([titleAlias])) {
    throw Error('require at least one field to be updated');
  }
  
  const video = await videoService.getVideoByBvid(bvid);
  if (!video) {
    throw Error(`video BV${bvid} not added yet`);
  }
  // params check done
  
  // update video
  const updatedVideo = await videoService.updateVideo(bvid, titleAlias);
  if (updatedVideo) {
    // TODO add log
  } else {
    // TODO add log, maybe unreachable? what about error log above?
  }
  
  return updatedVideo;
}

module.exports = {
  updateVideo,
};
