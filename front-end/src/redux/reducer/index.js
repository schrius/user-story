import { combineReducers } from 'redux';
import login from './login';
import story from './story';

export default combineReducers({
    login,
    story
});