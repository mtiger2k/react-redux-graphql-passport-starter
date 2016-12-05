import {
    FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILED,
    SIGN_OUT
} from '../actions/types';

export default function (auth = {currentUser: null, loading: false}, action) {
    switch (action.type) {
        case FETCH_USER:
            return Object.assign({}, auth, {
                loading: true
            })
        case FETCH_USER_SUCCESS:
            return Object.assign({}, auth, {
                loading: false,
                currentUser: action.result.data?action.result.data:null
            })
        case FETCH_USER_FAILED:
            return Object.assign({}, auth, {
                loading: false
            })
        case SIGN_OUT:
            return {}
        default:
            return auth
    }

}