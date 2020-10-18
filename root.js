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
    // TODO raise error, return code 400 when invalid params detected
  }
  
  // to where string
  compile() {
    const templates = [];
    const values = [];
    if (this.title_alias) {
      templates.push('`title_alias` LIKE ?');
      values.push(`%${this.title_alias}%`);
    }
    if (this.pubdate_min) {
      templates.push('`pubdate` >= ?');
      values.push(this.pubdate_min);
    }
    if (this.pubdate_max) {
      templates.push('`pubdate` <= ?');
      values.push(this.pubdate_max);
    }
    return [
      templates.reduce((prev, curr) => prev += ` && ${curr}`, ''),
      values,
    ];
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
    const result = await db.query('SELECT * FROM `ms_video` WHERE `bvid` = ?', [bvid]);
    return result ? new Video(result[0]) : null;
  },
  videos: async function ({ filter = {} }) {
    filter = new VideoFilter(filter);
    filter.validate();
    const [template, values] = filter.compile();
    const results = await db.query('SELECT * FROM `ms_video` WHERE 1=1' + template, [...values]);
    return results ? results.map(x => new Video(x)) : [];
  },
}

module.exports = root;