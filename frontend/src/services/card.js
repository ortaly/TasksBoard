import axios from 'axios';

const cardServices = {
    async addNewCard(listId, title) {
        const token = localStorage.getItem('userToken'); 
        const response = await axios.post(`http://localhost:3000/card`, { listId, title}, { headers: {"x-access-token" : `${token}`}});
        return response.data;
    },

    updateCard(cardId, newDataObj) {
        const token = localStorage.getItem('userToken');
        axios.put(`http://localhost:3000/card/${cardId}`, newDataObj,
            { headers: {"x-access-token" : `${token}`}});
    }
}

export default cardServices;