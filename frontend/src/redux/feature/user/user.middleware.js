import { push } from 'react-router-redux';
import * as AT from '../../actionTypes';
import userService from '../../../services/user';
import { setBoards } from '../boards/boards.actions';
import { setUser } from './user.actions';
import { userLogin } from '../auth/auth.actions';
import history from '../../store';


const { USERS } = AT;
export const usersMiddleware = ({ dispatch, getState }) => (next) => async (action) => {
  next(action);

  switch (true) {
    case action.type.includes(`${USERS} ${AT.GET_BOARDS}`): {
        if( getState().user && getState().user.id ){
            const boards = await userService.getBoards();
            dispatch(setBoards(boards));
        }
    }
    break;

    case action.type.includes(`${USERS} ${AT.CREATE_USER}`): {
      const {firstName, lastName, email, password} = action.payload;
      const data = await userService.register(firstName, lastName, email, password);
      if (data && data.user){
        dispatch(setUser(data.user));
        dispatch(userLogin(data.token));
        history.push('/');
      } else {
        if(data && data.errmsg) {
          alert(data.errmsg);
          history.push('/');
        }
      }
    }
    break;
  }
};