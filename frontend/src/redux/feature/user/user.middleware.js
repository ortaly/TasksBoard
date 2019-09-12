import * as AT from '../../actionTypes';
import userService from '../../../services/user';
import { setBoards } from '../boards/boards.actions';
import { setUser } from './user.actions';
import { userLogin } from '../auth/auth.actions';
import { push } from 'react-router-redux';


const { USERS } = AT;
export const usersMiddleware = ({ dispatch, getState }) => (next) => async (action) => {
  next(action);

  const { history } = window;

  if (!action.type.includes(USERS)) {
    return;
  }

  if (action.type.includes(`${USERS} ${AT.GET_BOARDS}`)) {
    if (getState().user && getState().user.id) {
      const boards = await userService.getBoards();
      dispatch(setBoards(boards));
    }
    return;
  }

  if (action.type.includes(`${USERS} ${AT.CREATE_USER}`)) {
    const { firstName, lastName, email, password } = action.payload;
    const data = await userService.register(firstName, lastName, email, password);
    if (data && data.user) {
      dispatch(setUser(data.user));
      dispatch(userLogin(data.token));
      dispatch(push('/boards'));
    } else {
      if (data && data.errmsg) {
        if(data.errmsg.includes(`duplicate key`)){
          alert("email exist!");
          dispatch(push('/'));
        }
      }
      return;
    }
  }
};
