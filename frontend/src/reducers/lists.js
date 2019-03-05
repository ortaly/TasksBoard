const lists = (lists = [], action) => {
    switch (action.type) {
        case 'SET_LISTS':
            return action.lists ;

        case 'ADD_NEW_LIST':
            return lists.concat(action.newList) ;
        
        default: 
            return lists
    }
  }
  export default lists;