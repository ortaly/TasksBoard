import * as AT from '../../actionTypes';

const { USERS } = AT;

const user = (state = [], action) => {
    switch (action.type) {
        case `${USERS} ${AT.SET_USER}`:
            return { ...state, ...action.payload.user };
        
        default:
            return state
    }
  }
  export default user;