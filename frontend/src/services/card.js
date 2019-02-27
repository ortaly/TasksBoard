import axios from 'axios';

const cardServices = {
    updateCard(cardId, newDataObj) {
        const token = localStorage.getItem('userToken');
        axios.put(`http://localhost:3000/card/${cardId}`, newDataObj,
            { headers: {"x-access-token" : `${token}`}});
    }
}

export default cardServices;