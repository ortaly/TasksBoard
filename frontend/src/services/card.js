import axios from 'axios';

const token = localStorage.getItem('userToken'); 
const cardServices = {
    async addNewCard(listId, title) {
        const response = await axios.post(`http://localhost:3000/card`, { listId, title}, 
            { headers: { "x-access-token" : `${token}` }});
        return response.data;
    },

    updateCard(cardId, newDataObj) {
        axios.put(`http://localhost:3000/card/${cardId}`, newDataObj,
            { headers: { "x-access-token" : `${token}` }});
    },

    deleteCard(cardId) {
        axios.delete( `http://localhost:3000/card/${cardId}`, { headers: { "x-access-token" : `${token}` }});
    }
}

export default cardServices;