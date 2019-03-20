import * as AT from '../../actionTypes';

const { AUTH } = AT;

export const userLogin = token => ({
    type: `${AUTH} ${AT.LOGIN_USER}`,
    payload: token
});


