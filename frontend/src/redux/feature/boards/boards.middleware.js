import * as AT from '../../actionTypes';
import boardService from '../../../services/board';
import { addBoard, setSelectedBoard } from './boards.actions';

const { BOARDS } = AT;
export const boardsMiddleware = ({ dispatch, getState }) => (next) => async (action) => {
  next(action);

  switch (true) {
    case action.type.includes(`${BOARDS} ${AT.CREATE_BOARD}`): {
        const userId = getState().user && getState().user.id;
        const newBoard = await boardService.createNewBoard(userId, action.payload.boardName);
        dispatch(addBoard(newBoard));
    }
    break;

    case action.type.includes( `${BOARDS} ${AT.SELECT_BOARD}`): {
        const boards = getState().boards.boardsList;
        const board = boards.find(board => {
            return board._id === action.payload.boardId;
        })
        dispatch(setSelectedBoard(board));
    }
    break;
  }
};