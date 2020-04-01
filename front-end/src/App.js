import React from 'react';
import {history} from './store';
import Routes from './routes';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import { Router } from 'react-router-dom';
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router history={history}>
            <Routes />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
