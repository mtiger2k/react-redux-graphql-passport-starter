import { createStore, applyMiddleware, compose } from 'redux'
import {routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';
import createLogger from 'redux-logger'

import DevTools from '../containers/DevTools';
import promiseMiddleware from '../middleware/promiseMiddleware';
import getReducer from '../reducers'

const middleware = routerMiddleware(browserHistory)

const middlewares = process.env.NODE_ENV === 'development' ?
    [applyMiddleware(promiseMiddleware, middleware, createLogger()), /*DevTools.instrument()*/] :
    [applyMiddleware(promiseMiddleware, middleware)];

export default function configureStore(initialState = {}, apolloClient) {
    const store = createStore(
        getReducer(apolloClient),
        initialState,
        compose(applyMiddleware(apolloClient.middleware()), ...middlewares)
    );
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
          const nextReducer = require('../reducers/index')(apolloClient).default;
          store.replaceReducer(nextReducer);
        });
    }

    return store;
}