import {
    NOTES_SHOW,
    NOTES_INDEX,
} from '../actions/types';

export default function(state = {}, action) {

    switch(action.type) {
    case NOTES_SHOW:
        return { ...state };
    case NOTES_INDEX:
        console.log('notesIndex reducer: ', action.payload.data); // TODO remove console.log
        
        return { ...state, notes: action.payload.data };
    default:
        return state;
    }
}
