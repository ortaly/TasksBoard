const user = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, ...action.user };

        case 'LOG_OUT':
            return { ...state, id: '', name: '', email: '' };
        
        default:
            return state
    }
  }
  export default user;