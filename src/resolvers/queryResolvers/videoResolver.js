const videoService = require('../../services/videoService');

async function video({ bvid }) {
  return videoService.getVideoByBvid(bvid);
}

module.exports = {
  video,
};
