import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './redux/reducer';
import {localStorageMiddleware} from './middleware';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const middleware = applyMiddleware(localStorageMiddleware, thunk, logger);

export default createStore(reducer, middleware);