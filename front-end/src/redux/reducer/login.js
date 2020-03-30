import {
    LOGIN,
    SET_LOADING_USER,
    LOGIN_ERROR,
    LOGOUT,
    ADMIN_LOGIN,
  } from '../../constants/actionTypes';
import {history} from '../../store';

export default (state = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    loading: false,
    error: null
}, action) => {
    switch (action.type) {
        case LOGIN:{
            history.push('/story-list')
            return { ...state, loading: false, user: action.payload };
        }
        case ADMIN_LOGIN:{
            history.push('/story-approval')
            return { ...state, loading: false, user: action.payload };
        }
        case LOGIN_ERROR:
            return { ...state, loading: false, error: action.payload };
        case SET_LOADING_USER:
            return { ...state, loading: true };
        case LOGOUT:
            history.push('/login')
            return { ...state, loading: false, user: {} };
        default:
            return state;
    }
}