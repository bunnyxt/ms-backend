const biliAPI = require('bili-api');
const videoService = require('../services/videoService');
const memberService = require('../services/memberService');
const recordService = require('../services/recordService');
const { removeSecond } = require('../utils/index');

const root = {
  // Query
  async video({ bvid }) {
    return videoService.getVideoByBvid(bvid);
  },
  async videos({ filter = {} }) {
    return videoService.getVideos(filter);
  },
  async member({ mid }) {
    return memberService.getMemberByMid(mid);
  },
  async members() {
    return memberService.getMembers();
  },
  // Mutation
  async addVideo({ input }) {
    // params check
    const { bvid } = input;
    const video = await videoService.getVideoByBvid(bvid);
    if (video) {
      throw Error(`video BV${bvid} already added yet`);
    }
    
    const { titleAlias } = input;
    // params check done
    
    // fetch video, add video and member if need
    const videoFromApi = await biliAPI({ bvid }, ['view']);
    if (!videoFromApi) {
      throw Error(`cannot fetch video BV${bvid} from bilibili api`);
    }
    const { title, pubdate, owner: { mid, name } } = videoFromApi.view.data;
    
    const member = await memberService.getMemberByMid(mid);
    if (!member) {
      if (typeof mid !== 'number') {
        throw Error(`invalid mid ${mid}`);
      }
      if (typeof name !== 'string') {
        throw Error(`invalid name ${name}`);
      }
      // add member
      await memberService.addMember(mid, name);
    }
    
    // add video
    const addedVideo = await videoService.addVideo(bvid, titleAlias || title, pubdate, mid);
    if (addedVideo) {
      // TODO add log
    } else {
      // TODO add log, maybe unreachable? what about error log above?
    }
    
    return addedVideo;
  },
  async updateVideo({ bvid, input }) {
    // params check
    const { titleAlias } = input;
    if (titleAlias === undefined) {
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
  },
};

module.exports = root;
