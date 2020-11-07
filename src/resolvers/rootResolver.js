const biliAPI = require('bili-api');
const { video } = require('./queryResolvers/videoResolver');
const { videos } = require('./queryResolvers/videosResolver');
const { member } = require('./queryResolvers/memberResolver');
const { members } = require('./queryResolvers/membersResolver');
const { addRecord } = require('./mutationResolvers/addRecordResolver');
const { updateRecord } = require('./mutationResolvers/updateRecordResolver');
const { addVideo } = require('./mutationResolvers/addVideoResolver');
const { updateVideo } = require('./mutationResolvers/updateVideoResolver');

const rootResolver = {
  // Query
  video,
  videos,
  member,
  members,
  // Mutation
  addRecord,
  updateRecord,
  addVideo,
  updateVideo,
};

module.exports = rootResolver;
