import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import cors from 'cors';
import { createServer } from 'http';
require('dotenv').config()

import typeDefs from './schema'
import resolvers from './resolvers/resolvers'
import models from './models/base';

const schema = makeExecutableSchema({ typeDefs, resolvers, });

const SECRET = process.env.SECRET

const app = express();

app.use(cors('*'));

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress( req => ({ schema, context: { models, SECRET }})),
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

const server = createServer(app);

models.sequelize.sync({}).then(() => server.listen(process.env.PORT));