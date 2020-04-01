
import {
    LOGIN,
    LOGOUT
} from './constants/actionTypes';

const localStorageMiddleware = store => next => action => {
    if(action.type === LOGIN){
        localStorage.setItem('jwt', action.payload)
    }
    if (action.type === LOGOUT){
        localStorage.removeItem('jwt')
    }
    next(action);
}

export { localStorageMiddleware };