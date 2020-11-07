const videoService = require('../../services/videoService');

async function videos({ filter = {} }) {
  return videoService.getVideos(filter);
}

module.exports = {
  videos,
};
