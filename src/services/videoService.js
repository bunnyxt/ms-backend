const db = require('./db');
const Video = require('../models/Video');
const VideoFilter = require('../models/VideoFilter');

async function getVideoByBvid(bvid) {
  const result = await db.query('SELECT * FROM `ms_video` WHERE `bvid` = ?', [bvid]);
  return result.length > 0 ? new Video(result[0]) : null;
}

async function getVideos(filter = {}) {
  const videoFilter = new VideoFilter(filter);
  videoFilter.validate();
  const [template, values] = videoFilter.compile();
  const results = await db.query(`SELECT * FROM \`ms_video\` WHERE 1=1 ${template}`, [...values]);
  return results.map((video) => new Video(video));
}

async function addVideo(bvid, titleAlias, pubdate, mid) {
  await db.query(
    'INSERT INTO `ms_video` (`bvid`, `title_alias`, `pubdate`, `mid`) VALUES (?, ?, ?, ?)',
    [bvid, titleAlias, pubdate, mid],
  );
  return getVideoByBvid(bvid);
}

async function updateVideo(bvid, titleAlias) {
  await db.query('UPDATE `ms_video` SET `title_alias` = ? WHERE `bvid` = ?', [titleAlias, bvid]);
  return getVideoByBvid(bvid);
}

module.exports = {
  getVideoByBvid,
  getVideos,
  addVideo,
  updateVideo,
};
