import * as AT from '../../actionTypes';

const { BOARDS } = AT;

export const setBoards = boards => ({
    type: `${BOARDS} ${AT.SET_BOARDS}`,
    payload : boards
});

export const addBoard = board => ({
    type: `${BOARDS} ${AT.ADD_BOARD}`,
    payload: board
});

export const createBoard = boardName => ({
    type: `${BOARDS} ${AT.CREATE_BOARD}`,
    payload: { boardName }
});

export const selectBoard = boardId => ({
    type: `${BOARDS} ${AT.SELECT_BOARD}`,
    payload: { boardId }
})

export const setSelectedBoard = board => ({
    type: `${BOARDS} ${AT.SET_SELECTED_BOARD}`,
    payload: board
});



