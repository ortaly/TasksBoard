import { combineReducers } from 'redux';
import user from './feature/user/user.reducer';
import boards from './feature/boards/boards.reducer';
import lists from './feature/lists/lists.reducer';

const reducers = combineReducers({
    user,
    boards,
    lists,
});
  
export default reducers;