import React from 'react';
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import Routes from './Routes';
import { Provider } from 'react-redux';
import './App.css';
import store from './store'

const browerHistory = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router history={browerHistory}>
            <Routes />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
