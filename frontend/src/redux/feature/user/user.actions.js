import * as AT from '../../actionTypes';

const { USERS } = AT;

export const setUser = user => ({
    type: `${USERS} ${AT.SET_USER}`,
    payload: { user }
});

export const createUser = user => ({
    type: `${USERS} ${AT.CREATE_USER}`,
    payload: { ...user }
})

export const getBoards = () => ({
    type: `${USERS} ${AT.GET_BOARDS}`
})


