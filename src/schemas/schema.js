const { buildSchema } = require('graphql');

const schema = buildSchema(`
type Video {
  id: Int!
  bvid: String!
  titleAlias: String!
  pubdate: Int!
  mid: Int!
  owner: Member!
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
type Query {
  video(bvid: String!): Video
  videos(filter: VideoFilter): [Video!]!
  member(mid: Int!): Member
  members: [Member!]!
}
`);

module.exports = schema;
