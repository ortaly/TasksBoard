const boards = (state = [], action) => {
    switch (action.type) {
        case 'SET_BOARDS':
            return { ...state, boards: action.boards };

        case 'SET_SELECTED_BOARD':
            return { ...state, selectedBoard: action.board };
        
        default: 
            return state
    }
  }
  export default boards;