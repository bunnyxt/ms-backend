const { buildSchema } = require('graphql');

const schema = buildSchema(`
type Video {
  id: Int!
  bvid: String!
  titleAlias: String!
  pubdate: Int!
  pubdateStr(format: String): String!
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
  timeStr(format: String): String!
  timespan: Int!
  timespanStr(yearFormat: Boolean, considerLunarYear: Boolean, paddingZero: Boolean): String!
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
input RecordAddInput {
  bvid: String!
  threshold: Int!
  preciseValue: Int!
  time: Int!
  srcType: String
  srcAuthor: String
  srcUrl: String
  remark: String
}
input RecordUpdateInput {
  threshold: Int
  preciseValue: Int
  time: Int
  srcType: String
  srcAuthor: String
  srcUrl: String
  remark: String
}
input VideoAddInput {
  bvid: String!
  titleAlias: String
}
input VideoUpdateInput {
  titleAlias: String
}
type Mutation {
  addRecord(input: RecordAddInput!): Record!
  updateRecord(id: Int!, input: RecordUpdateInput!): Record!
  addVideo(input: VideoAddInput!): Video!
  updateVideo(bvid: String!, input: VideoUpdateInput!): Video!
}
`);

module.exports = schema;
