import * as AT from '../../actionTypes';
import userService from '../../../services/user';
import { setBoards } from '../boards/boards.actions';

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

  }
};