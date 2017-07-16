import {
  GET_NOTE
} from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
    case GET_NOTE:
        return action.payload;
    default:
        return state;
    }
}
