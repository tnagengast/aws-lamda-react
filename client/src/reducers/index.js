import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import NoteReducer from './NoteReducer';
import UserTokenReducer from './UserTokenReducer';

const rootReducer = combineReducers({
    notes: NoteReducer,
    userToken: UserTokenReducer,
    form: formReducer,
    isLoading: false,
});

export default rootReducer;
