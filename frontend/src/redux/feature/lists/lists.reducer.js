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

        // case `${LISTS} ${AT.ADD_NEW_LIST}`:
        case `${LISTS} ${AT.SET_LIST}`:
            console.log("reducer " + action.type);
            return {...lists, [action.payload._id]: action.payload}
        
        default: 
            return lists
    }
  }
  export default lists;