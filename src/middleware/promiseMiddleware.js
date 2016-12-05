import axios from 'axios';

function createThunkMiddleware(extraArgument) {
    return ({dispatch, getState}) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }
        const {promise, types, afterSuccess, ...rest} = action;
        if (!action.promise) {
            return next(action);
        }

        const [REQUEST, SUCCESS, FAILURE] = types;
        next({...rest, type: REQUEST});

        const onFulfilled = result => {
            next({...rest, result, type: SUCCESS});
              if (afterSuccess) {
                afterSuccess(dispatch, getState, result);
              }
        };
        const onRejected = (error) => {
            next({...rest, error, type: FAILURE});
        };
        return promise(axios)
            .then(onFulfilled, onRejected)
            .catch(error => {
                console.error('MIDDLEWARE ERROR:', error);
                onRejected(error)
            });
    };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;