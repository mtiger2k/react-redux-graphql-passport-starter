import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './containers/Layout';
import Home from './containers/Home';
import Counter from './containers/Counter';
import RemoteCounter from './containers/RemoteCounter';
import About from './containers/About';

export default (
	<Route path="/" component={Layout}>
		<IndexRoute component={Home} />
		<Route name="Counter" path="localCounter" component={Counter} />
		<Route name="RemoteCounter" path="remoteCounter" component={RemoteCounter} />
		<Route name="About" path="about" component={About} />
	</Route>
);
