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

module.exports = VideoFilter;
