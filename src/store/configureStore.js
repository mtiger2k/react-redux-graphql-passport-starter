import { createStore, applyMiddleware, compose } from 'redux'
import DevTools from '../containers/DevTools';
import getReducer from '../reducers'

export default function configureStore(initialState = {}, apolloClient) {
    const store = createStore(
        getReducer(apolloClient),
        initialState,
        DevTools.instrument()
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