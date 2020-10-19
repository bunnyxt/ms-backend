const db = require('./db');

class VideoFilter {
  constructor({ titleAlias, pubdateMin, pubdateMax }) {
    this.titleAlias = titleAlias;
    this.pubdateMin = pubdateMin;
    this.pubdateMax = pubdateMax;
  }
  
  // check validation of filter params
  validate() {
    // TODO raise error, return code 400 when invalid params detected
    if (this.pubdateMax && this.pubdateMin && this.pubdateMax < this.pubdateMin) {
      // TODO
    }
  }
  
  // to where string
  compile() {
    const templates = [];
    const values = [];
    if (this.titleAlias) {
      templates.push('`title_alias` LIKE ?');
      values.push(`%${this.titleAlias}%`);
    }
    if (this.pubdateMin) {
      templates.push('`pubdate` >= ?');
      values.push(this.pubdateMin);
    }
    if (this.pubdateMax) {
      templates.push('`pubdate` <= ?');
      values.push(this.pubdateMax);
    }
    return [
      templates.reduce((prev, curr) => `${prev} && ${curr}`, ''),
      values,
    ];
  }
}

class Video {
  constructor({
    id, bvid, titleAlias, pubdate, mid,
  }) {
    this.id = id;
    this.bvid = bvid;
    this.titleAlias = titleAlias;
    this.pubdate = pubdate;
    this.mid = mid;
  }
}

const root = {
  async video({ bvid }) {
    const result = await db.query('SELECT * FROM `ms_video` WHERE `bvid` = ?', [bvid]);
    return result ? new Video(result[0]) : null;
  },
  async videos({ filter = {} }) {
    const videoFilter = new VideoFilter(filter);
    videoFilter.validate();
    const [template, values] = videoFilter.compile();
    const results = await db.query(`SELECT * FROM \`ms_video\` WHERE 1=1 ${template}`, [...values]);
    return results ? results.map((video) => new Video(video)) : [];
  },
};

module.exports = root;
