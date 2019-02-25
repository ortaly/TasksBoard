import { combineReducers } from 'redux';
import user from './user';
import boards from './boards';

const reducers = combineReducers({
    user,
    boards
});
  
export default reducers;