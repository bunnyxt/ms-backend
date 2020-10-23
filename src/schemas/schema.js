const { buildSchema } = require('graphql');

const schema = buildSchema(`
type Video {
  id: Int!
  bvid: String!
  titleAlias: String!
  pubdate: Int!
  mid: Int!
  owner: Member!
  records: [Record!]!
}
input VideoFilter {
  titleAlias: String
  pubdateMin: Int
  pubdateMax: Int
}
type Member {
  id: Int!
  mid: Int!
  name: String!
}
type Record {
  id: Int!
  bvid: String!
  threshold: Int!
  preciseValue: Int!
  time: Int!
  timespan: Int!
  srcType: String
  srcAuthor: String
  srcUrl: String
  remark: String
}
type Query {
  video(bvid: String!): Video
  videos(filter: VideoFilter): [Video!]!
  member(mid: Int!): Member
  members: [Member!]!
}
`);

module.exports = schema;
