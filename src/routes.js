import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './containers/Layout';
import Home from './containers/Home';
import Counter from './containers/Counter';
import About from './containers/About';

export default (
	<Route path="/" component={Layout}>
		<IndexRoute component={Home} />
		<Route name="Counter" path="counter" component={Counter} />
		<Route name="About" path="about" component={About} />
	</Route>
);
