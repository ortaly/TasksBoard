import * as AT from '../../actionTypes';

const { LISTS } = AT;

const lists = (lists = [], action) => {
    switch (action.type) {
        case `${LISTS} ${AT.SET_LISTS}`:
            const reducer = (acc, list) => { 
                acc[list._id] = list;
                return acc;
            };
            const listsObj = action.payload.reduce(reducer, {});
            return listsObj;

        case `${LISTS} ${AT.SET_LIST}`:
            return {...lists, [action.payload._id]: action.payload};

        case `${LISTS} ${AT.SET_LISTS_OBJ}`:
            return {...action.payload};
        
        default: 
            return lists
    }
  }
  export default lists;