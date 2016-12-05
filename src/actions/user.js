import {
    FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILED
} from './types';

export function fetchUser() {
    return {
        types: [FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILED],
        promise: client => client.get('/user')
    };
}

