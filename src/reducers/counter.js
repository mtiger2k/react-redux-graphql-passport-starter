import { ADD_COUNTER } from '../actions/types'

export default function(counter = {count: 0}, action) {
    switch(action.type) {
        case ADD_COUNTER:
            return {count: ++counter.count};
        default:
            return counter;
    }
}