const videoService = require('../../services/videoService');
const memberService = require('../../services/memberService');

async function addVideo({ input }) {
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
}

module.exports = {
  addVideo,
};
