import * as AT from '../../actionTypes';
import cardServices from '../../../services/card';
import listServices from '../../../services/list';
import { setList, setListsObj, deleteCard } from './list.actions';

const { LISTS } = AT;
export const listsMiddleware = ({ dispatch, getState }) => (next) => async (action) => {
  next(action);

  switch (true) {
    case action.type.includes(`${LISTS} ${AT.MOVE_CARD}`): {
        const lists = getState().lists;
        const { cardId, origListId, destListId} = action.payload;
        const orgList = Object.assign({}, lists[origListId]);
        const destList = Object.assign({}, lists[destListId]);

        const origCardsArr = orgList.cards.slice();
        const destCardsArr = destList.cards.slice();

        const cardToMoveIndex = origCardsArr.findIndex(
          card => card._id === cardId
        );
        const card = origCardsArr[cardToMoveIndex];
        card.listId = destListId;
        //remove card
        origCardsArr.splice(cardToMoveIndex, 1);
        destCardsArr.push(card);

        orgList.cards = origCardsArr;
        destList.cards = destCardsArr;

        dispatch(setList(orgList));
        dispatch(setList(destList));
        cardServices.updateCard(cardId, {"listId": destListId});
    }
    break;

    case action.type.includes(`${LISTS} ${AT.SET_CARD_NAME}`): {
      const {listId, cardId, newName} = action.payload;
      const list = getState().lists[listId]
      const cards = list.cards.slice();
      const cardIndex = cards.findIndex(
        card => card._id === cardId
      );
      cards[cardIndex].title = newName;
      list.cards = cards;
      dispatch(setList(list));
      cardServices.updateCard(cardId, {listId});
    }
    break;

    case action.type.includes(`${LISTS} ${AT.UPDATE_LIST}`): {
      listServices.updateList(action.payload.listId, {"title" : action.payload.name});
    }
    break;

    case action.type.includes(`${LISTS} ${AT.ADD_NEW_LIST}`): {
      const list = await listServices.createList(action.payload.boardId, action.payload.name);
      dispatch(setList(list));
    }
    break;

    case action.type.includes(`${LISTS} ${AT.ADD_NEW_CARD}`): {
      const { listId } = action.payload;
      let newCard = await cardServices.addNewCard(listId,  "Card Title");
      const list = Object.assign({}, getState().lists[listId]);
      if(list) {
        newCard.isNew = true;
        list.cards.push(newCard);
        dispatch(setList(list));
      }
    }
    break;

    case action.type.includes(`${LISTS} ${AT.DELETE_CARD}`): {
      const { cardId, listId} = action.payload;

      
      const lists = getState().lists;
      const list = Object.assign({}, lists[listId]);
      const listCardsArr = list.cards.slice();

      const cardIndex = listCardsArr.findIndex(
        card => card._id === cardId
      );
      if(cardIndex >= 0 ) {
        listCardsArr.splice(cardIndex, 1);
        list.cards = listCardsArr;
        dispatch(setList(list));
        cardServices.deleteCard(cardId);
      }
    }
    break;

    case action.type.includes(`${LISTS} ${AT.DELETE_LIST}`): {
      const { listId } = action.payload;

      const lists = getState().lists;
      lists[listId].cards.map(card => dispatch(deleteCard(card._id, listId)));
      delete lists[listId];
      dispatch(setListsObj(lists));
      listServices.deleteList(listId);      
    }
    break;
  }
};