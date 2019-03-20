import * as AT from '../../actionTypes';

const { BOARDS } = AT;

const boards = (state = [], action) => {
    switch (action.type) {
        case `${BOARDS} ${AT.SET_BOARDS}`:
            return { ...state, boardsList: action.payload };

        case `${BOARDS} ${AT.ADD_BOARD}`:
            return { ...state, boardsList:[...state.boardsList, action.payload]}

        case `${BOARDS} ${AT.SET_SELECTED_BOARD}`:
            return { ...state, selectedBoard: action.payload };
        
        default: 
            return state
    }
  }
  export default boards;