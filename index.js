// config in .env
require('dotenv').config();

// express, middlewares and express-graphql server
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

// root ans schema
const schema = require('./src/schemas/schema');
const root = require('./src/resolvers/root');

// create express app
const app = express();

// cors
app.use(cors());

// graphql
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

// start server
const PORT = Number(process.env.PORT);
if (!(PORT >= 1024 && PORT <= 65535)) {
  console.error(`Invalid port ${PORT} detected!`);
  process.exit(1);
}
app.listen(PORT, () => {
  console.log(`GraphQL API server running at localhost:${PORT}/graphql`);
});
