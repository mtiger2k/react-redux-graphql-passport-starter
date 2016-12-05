import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import DevTools from './containers/DevTools';
import routes from './routes';
import configureStore from './store/configureStore';

import { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Client } from 'subscriptions-transport-ws';

import createApolloClient from './network/create-apollo-client';
import addGraphQLSubscriptions from './network/subscriptions';

import './styles/main.scss';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const PORT = process.env.PORT || '3000';
const WS_PORT = process.env.WS_PORT || '8082';
const wsClient = new Client(window.location.origin.replace(/^http/, 'ws')
    .replace(':' + PORT, ':' + WS_PORT));

const networkInterface = createNetworkInterface({uri: '/api/graphql'});
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
);

const client = createApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    initialState: window.__APOLLO_STATE__,
    ssrForceFetchDelay: 100
});

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, client);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
      <div>
          {devTools}
          <Router history={history} routes={routes} />
      </div>
  </ApolloProvider>,
  document.getElementById('root')
);