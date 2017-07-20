import {
    GET_USER_TOKEN,
    UPDATE_USER_TOKEN,
} from '../actions/types';

export default function(state = '', action) {

    switch(action.type) {
    case GET_USER_TOKEN:
        return action.payload;
    case UPDATE_USER_TOKEN:
        return action.payload;
    default:
        return state;
    }
}
