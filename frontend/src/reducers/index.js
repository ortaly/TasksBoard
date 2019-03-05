import { combineReducers } from 'redux';
import user from './user';
import boards from './boards';
import lists from './lists';

const reducers = combineReducers({
    user,
    boards,
    lists
});
  
export default reducers;