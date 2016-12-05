import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './containers/Layout';
import Counter from './containers/Counter';

export default (
	<Route path="/" component={Layout}>
		<IndexRoute component={Counter} />
	</Route>
);
