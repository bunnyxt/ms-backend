const { buildSchema } = require('graphql');

const schema = buildSchema(`
type Video {
  id: Int!
  bvid: String!
  titleAlias: String!
  pubdate: Int!
  mid: Int!
}
input VideoFilter {
  titleAlias: String
  pubdateMin: Int
  pubdateMax: Int
}
type Query {
  video(bvid: String!): Video
  videos(filter: VideoFilter): [Video!]!
}
`);

module.exports = schema;
