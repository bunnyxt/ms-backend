const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Video {
    id: Int!
    bvid: String!
    title_alias: String!
    pubdate: Int!
    mid: Int!
  }
  input VideoFilter {
    title_alias: String
    pubdate_min: Int
    pubdate_max: Int
  }
  type Query {
    video(bvid: String!): Video
    videos(filter: VideoFilter): [Video!]!
  } `);

module.exports = schema;
