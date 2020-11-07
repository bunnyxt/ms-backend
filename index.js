// config in .env
require('dotenv').config();

// express, middlewares and express-graphql server
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

// root ans schema
const schema = require('./src/schemas/schema');
const rootResolver = require('./src/resolvers/rootResolver');

// create express app
const app = express();

// cors
app.use(cors());

// graphql
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: rootResolver,
  graphiql: true,
}));

// start server
const PORT = process.env.PORT || 5222;
app.listen(PORT, () => {
  console.log(`GraphQL API server running at localhost:${PORT}/graphql`);
});
