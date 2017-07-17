import {
    GET_USER_TOKEN
} from '../actions/types';

export default function(state = {}, action) {
    
    switch(action.type) {
    case GET_USER_TOKEN:
        return { ...state, userToken: action.payload };
    default:
        return state;
    }
}
