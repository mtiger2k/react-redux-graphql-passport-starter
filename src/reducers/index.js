import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';

export default (apolloClient) => {
    return combineReducers({
        counter,
        routing,
        apollo: apolloClient.reducer()
    });
}