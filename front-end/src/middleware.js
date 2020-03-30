
import {
    LOGIN,
    LOGOUT,
    ADMIN_LOGIN
} from './constants/actionTypes';

const localStorageMiddleware = store => next => action => {
    if(action.type === LOGIN || action.type === ADMIN_LOGIN){
        localStorage.setItem('user', JSON.stringify(action.payload))
    }
    if (action.type === LOGOUT){
        localStorage.removeItem('user')
    }
    next(action);
}

export { localStorageMiddleware };