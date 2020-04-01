import {
    LOGIN,
    SET_LOADING_USER,
    LOGIN_ERROR,
    LOGOUT,
    SET_USER
  } from '../../constants/actionTypes';
import {history} from '../../store';
import { decode } from 'jsonwebtoken';
import {StoryAPI} from '../../api';

export default (state = {
    token: null,
    loading: false,
    error: null
}, action) => {
    switch (action.type) {
        case SET_USER:
        case LOGIN:
            const user = decode(action.payload);
            if(user.roles.includes("Admin")){
                history.push('/story-approval')
            } else {
                history.push('/story-list')
            }
            StoryAPI.setToken(action.payload)
            return { 
                ...state, 
                loading: false,
                user: {
                    username: user.username,
                    roles: user.roles
                },
                token: action.payload 
            };
        case LOGIN_ERROR:
            return { ...state, loading: false, error: action.payload };
        case SET_LOADING_USER:
            return { ...state, loading: true };
        case LOGOUT:
            history.push('/login')
            return { ...state, loading: false, token: null, user: null };
        default:
            return state;
    }
}