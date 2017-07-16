import { combineReducers } from 'redux';
import NoteReducer from './NoteReducer';
import ActiveNoteReducer from './ActiveNoteReducer';

const rootReducer = combineReducers({
    notes: NoteReducer,
    activeNote: ActiveNoteReducer
});

export default rootReducer;
