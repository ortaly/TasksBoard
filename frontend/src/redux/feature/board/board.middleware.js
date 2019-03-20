import * as AT from '../../actionTypes';
import boardServices from '../../../services/board';
import listServices from '../../../services/list';

import { setLists } from '../lists/list.actions';

const { BOARD } = AT;
export const boardMiddleware = ({ dispatch, getState }) => (next) => async (action) => {
  next(action);

  switch (true) {
    case action.type.includes(`${BOARD} ${AT.GET_BOARD_DATA}`): {
      const boardId = getState().boards.selectedBoard._id;
      const listsData = await boardServices.getBoardLists(boardId);
      // lists.map(async list => {
      //   const cards = await listServices.getListCards(list._id);
      //   dispatch(setCards(cards));
      // })

      const lists = await Promise.all(listsData.map(async list => {
          const cards = await listServices.getListCards(list._id);
          console.log(`cards for ${list._id}: ` + JSON.stringify(cards));
          return {...list, cards: cards};
      }));
      console.log("Lists: " + JSON.stringify(lists));
      dispatch(setLists(lists));
    }
    break;
  }
};