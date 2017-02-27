import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import jwtDecode from 'jwt-decode';

import configureStore from './store/configureStore';

import { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

import createApolloClient from './network/create-apollo-client';

import getRoutes from './routes';
import {setupAxiosInterceptors} from './middleware/axios';
import {redirectToLoginWithMessage, signOutUser} from './actions/auth';

import './styles/main.scss';

const PORT = process.env.PORT || '3000';
const WS_PORT = process.env.WS_PORT || '8082';
const wsClient = new SubscriptionClient(window.location.origin.replace(/^http/, 'ws')
    .replace(':' + PORT, ':' + WS_PORT), {
        reconnect: true
    });

const networkInterface = createNetworkInterface({uri: '/graphql'});
networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};  // Create the header object if needed.
        }

        var token = localStorage.getItem('auth-token');
        if (token) {
            req.options.headers['Authorization'] = 'JWT '.concat(token);
        }
        next();
    }
}]);

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
);

const client = createApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    initialState: window.__APOLLO_STATE__,
    ssrForceFetchDelay: 100
});

let initialState = window.__INITIAL_STATE__;

let token = localStorage.getItem('auth-token');
if (token) {
    try {
        let user = jwtDecode(token);
        initialState = {
            auth: {authenticated: true, token: token, logging: false},
            user: {user, loading: false}
        };
    } catch(ex) {}
}

const store = configureStore(initialState, client);
const history = syncHistoryWithStore(browserHistory, store);

const actions = bindActionCreators({redirectToLoginWithMessage, signOutUser}, store.dispatch);
setupAxiosInterceptors(() => actions.redirectToLoginWithMessage());

const routes = getRoutes(actions.signOutUser, store, client);

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
      <Router history={history} routes={routes} />
  </ApolloProvider>,
  document.getElementById('root')
);