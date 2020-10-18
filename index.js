// config in .env
require('dotenv').config();

// express and express-graphql server
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

// root ans schema
const schema = require('./schema');
const root = require('./root');

// start server
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
const PORT = Number(process.env.PORT);
if (!(PORT >= 1024 && PORT <= 65535)) {
  console.error(`Invalid port ${PORT} detected!`);
  process.exit(1);
}
app.listen(PORT);
console.log(`GraphQL API server running at localhost:${PORT}/graphql`);
