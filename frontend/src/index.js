import React from 'react';
import { ReactDOM } from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import consfigureStore, { history } from './redux/store';
import { HashRouter  as Router } from 'react-router-dom';
import App from './App'
import { syncHistoryWithStore } from 'react-router-redux';
// import { ConnectedRouter } from 'react-router-redux';

const store = consfigureStore();
// Create an enhanced history that syncs navigation events with the store
const connectedHistory = syncHistoryWithStore(history, store);

render(
  <Provider store={store}>
    <Router history={connectedHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)