import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import consfigureStore, { history } from './redux/store';
import { ConnectedRouter } from 'react-router-redux';
import App from './App'

const store = consfigureStore();

render((() => {
  debugger;
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  )})(),
  document.getElementById('root')
)
