import React from 'react';
import { ReactDOM } from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import consfigureStore, { history } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import App from './App'
// import { ConnectedRouter } from 'react-router-redux';

const store = consfigureStore();

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)