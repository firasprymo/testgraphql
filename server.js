const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema/schema');
const graphqlResolver = require('./graphql/resolvers/resolvers');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.options('*', cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);
const PORT = process.env.PORT || 5000;
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
