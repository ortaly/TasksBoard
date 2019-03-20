import * as AT from '../../actionTypes';

const { LISTS } = AT;

export const setLists = lists => ({
    type: `${LISTS} ${AT.SET_LISTS}`,
    payload: lists
});

export const addNewList = (boardId, name) => ({
    type: `${LISTS} ${AT.ADD_NEW_LIST}`,
    payload: {boardId, name}
});

export const moveCard = (cardId, origListId, destListId) => ({
    type: `${LISTS} ${AT.MOVE_CARD}`,
    payload: { cardId, origListId, destListId}
});

export const setList = list => ({
    type: `${LISTS} ${AT.SET_LIST}`,
    payload: list
});

export const setCardTitle = (listId, cardId, newName) => ({
    type : `${LISTS} ${AT.SET_CARD_NAME}`,
    payload: {listId, cardId, newName}
});

export const updateList = (listId, name) => ({
    type : `${LISTS} ${AT.UPDATE_LIST}`,
    payload: {listId, name}
});

export const addNewCard =  (listId) => ({
    type : `${LISTS} ${AT.ADD_NEW_CARD}`,
    payload: { listId }
});
