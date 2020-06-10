import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import reducers from './reducers';
import createHistory from 'history/createHashHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { authMiddleware } from './feature/auth/auth.middleware';
import { boardsMiddleware } from './feature/boards/boards.middleware';
import { usersMiddleware } from './feature/user/user.middleware';
import { boardMiddleware } from './feature/board/board.middleware';
import { listsMiddleware } from './feature/lists/lists.middleware';

const history = createHistory();
const routeMiddleware = routerMiddleware(history);

const middlewares = [
    routeMiddleware,
    authMiddleware, 
    boardsMiddleware, 
    usersMiddleware, 
    boardMiddleware, 
    listsMiddleware];

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
);

const configureStore = () => {
  const _reducers = {...reducers, routing: routerReducer} ;
  const store = createStore(combineReducers(_reducers), enhancer);
  // if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(_reducers);
      });
    }
  // }
  return store;
};

export default configureStore;

export { history };