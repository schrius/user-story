import {
    LOGIN,
    SET_LOADING,
    LOGIN_ERROR,
    LOGOUT,
    ADMIN_LOGIN,
  } from '../constants/actionTypes';
import {history} from '../store';

export default (state = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    isLoading: false,
    error: null
}, action) => {
    switch (action.type) {
        case LOGIN:{
            history.push('/story-list')
            return { ...state, isLoading: false, user: action.payload };
        }
        case ADMIN_LOGIN:{
            history.push('/story-approval')
            return { ...state, isLoading: false, user: action.payload };
        }
        case LOGIN_ERROR:
            return { ...state, isLoading: false, error: action.payload };
        case SET_LOADING:
            return { ...state, isLoading: true };
        case LOGOUT:
            history.push('/login')
            return { ...state, isLoading: false, user: {} };
        default:
            return state;
    }
}