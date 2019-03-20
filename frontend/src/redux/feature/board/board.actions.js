import * as AT from '../../actionTypes';

const { BOARD } = AT;

export const getBoardData = () => ({
    type: `${BOARD} ${AT.GET_BOARD_DATA}`
});