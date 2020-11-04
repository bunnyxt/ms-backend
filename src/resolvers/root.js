const biliAPI = require('bili-api');
const videoService = require('../services/videoService');
const memberService = require('../services/memberService');
const recordService = require('../services/recordService');
const { removeSecond, allUndefined } = require('../utils/index');

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
  async addRecord({ input }) {
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
  },
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
  },
};

module.exports = root;
