import {
    NOTES_SHOW,
    NOTES_INDEX
} from '../actions/types';

export default function(state = {}, action) {

    switch(action.type) {
    case NOTES_SHOW:
        return { ...state };
    case NOTES_INDEX:
        return { ...state, notes: action.payload };
    default:
        return state;
    }
}
