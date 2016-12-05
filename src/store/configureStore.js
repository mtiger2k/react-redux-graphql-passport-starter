import { createStore, applyMiddleware, compose } from 'redux'
import DevTools from '../containers/DevTools';
import reducer from '../reducers'

export default function configureStore(initialState = {}) {
    const store = createStore(
        reducer,
        initialState,
        DevTools.instrument()
    );
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
          const nextReducer = require('../reducers/index').default;
          store.replaceReducer(nextReducer);
        });
    }

    return store;
}