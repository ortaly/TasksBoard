import api from './api'; 


const token = localStorage.getItem('userToken'); 
const cardServices = {
    async addNewCard(listId, title) {
        const response = await api.post(`/card`, { listId, title}, 
            { headers: { "x-access-token" : `${token}` }});
        return response.data;
    },

    updateCard(cardId, newDataObj) {
        api.put(`http://localhost:3000/card/${cardId}`, newDataObj,
            { headers: { "x-access-token" : `${token}` }});
    },

    deleteCard(cardId) {
        api.delete( `http://localhost:3000/card/${cardId}`, { headers: { "x-access-token" : `${token}` }});
    }
}

export default cardServices;