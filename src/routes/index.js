import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../containers/Layout';
import Home from '../containers/Home';
import Counter from '../containers/Counter';
import RemoteCounter from '../containers/RemoteCounter';
import About from '../containers/About';

import privateRoute from './privateRoute';
import Login from '../containers/Login';
import { fetchUser } from '../actions/user';

export default function getRoutes(onLogout, store) {

    const logout = (nextState, replace, cb) => {
        onLogout();
        replace('/');
        cb();
    };

    if (store) {//from client
        let token = localStorage.getItem('auth-token');
        if (token !== null) {
            store.dispatch(fetchUser());
        }
    }

    return (
	<Route path="/" component={Layout}>
		<IndexRoute component={Home} />
		<Route name="Counter" path="localCounter" component={Counter} />
		<Route name="RemoteCounter" path="remoteCounter" component={privateRoute(RemoteCounter)} />
		<Route name="About" path="about" component={About} />
        <Route name="Login" path="login" component={Login} />
        <Route name="Logout" path="logout" onEnter={logout} />
	</Route>
    );
}