const db = require('./db');

// TODO add base class of Filter

class VideoFilter {
  constructor({ title_alias, pubdate_min, pubdate_max }) {
    this.title_alias = title_alias;
    this.pubdate_min = pubdate_min;
    this.pubdate_max = pubdate_max;
  }
  
  // check validation of filter params
  validate() {
  }
  
  // to where string
  compile() {
    const conditions = [];
    if (this.title_alias) {
      conditions.push(`title_alias like "%${this.title_alias}%"`);
    }
    if (this.pubdate_min) {
      conditions.push(`pubdate >= ${this.pubdate_min}`);
    }
    if (this.pubdate_max) {
      conditions.push(`pubdate <= ${this.pubdate_max}`);
    }
    return conditions.reduce((prev, curr) => prev += ` && ${curr}`, '');
  }
}

class Video {
  constructor({ id, bvid, title_alias, pubdate, mid }) {
    this.id = id;
    this.bvid = bvid;
    this.title_alias = title_alias;
    this.pubdate = pubdate;
    this.mid = mid;
  }
}

const root = {
  video: async function ({ bvid }) {
    // TODO SQL injection
    const result = await db.doQuery(`
      SELECT * FROM ms_video WHERE bvid = '${bvid}';
    `);
    return result ? new Video(result[0]) : null;
  },
  videos: async function ({ filter = {} }) {
    filter = new VideoFilter(filter);
    filter.validate();
    // TODO SQL injection
    const results = await db.doQuery(`
      SELECT * FROM ms_video WHERE 1=1 ${filter.compile()}
    `);
    return results ? results.map(x => new Video(x)) : [];
  },
}

module.exports = root;
