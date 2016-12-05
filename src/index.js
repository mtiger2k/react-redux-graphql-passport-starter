import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import DevTools from './containers/DevTools';
import routes from './routes';
import configureStore from './store/configureStore';
import './styles/main.scss';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
      <div>
          {devTools}
          <Router history={history} routes={routes} />
      </div>
  </Provider>,
  document.getElementById('root')
);