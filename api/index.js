import path from 'path';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { subscriptionManager } from './subscriptions';
import passport from 'passport';

import schema from './schema';
import * as CounterService from './services/countService'
import { setupLocalLogin } from './localLogin'

require('dotenv').config();

const API_PORT = process.env.API_PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

setupLocalLogin(app);

app.use('/graphql', passport.authenticate('jwt', {session: false}), graphqlExpress((req) => {
  const query = req.query.query || req.body.query;
  if (query && query.length > 2000) {
    throw new Error('Query too large.');
  }

  return {
    schema,
    context: {
      user: req.user,
      counterService: CounterService
    },
  };
}));

app.use(express.static('dist'));

app.listen(API_PORT, () => console.log( // eslint-disable-line no-console
  `API Server is now running on http://localhost:${API_PORT}`
));


/******************************************************************************
 * wesocket server
 ******************************************************************************/

const WS_PORT = process.env.WS_PORT;

// WebSocket server for subscriptions
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

websocketServer.listen(WS_PORT, () => console.log( // eslint-disable-line no-console
  `Websocket Server is now running on http://localhost:${WS_PORT}`
));

// eslint-disable-next-line
new SubscriptionServer(
  {
    subscriptionManager,
  },
  websocketServer
);
