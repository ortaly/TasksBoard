import axios from 'axios';

const token = localStorage.getItem('userToken');
const listServices = {
    async getListCards(listId) {
        const response = await axios.get(`http://localhost:3000/list/${listId}/cards`, 
            { headers: {"x-access-token" : `${token}`}});
        return response.data;
    },

    updateList(id, newDataObj) {
        axios.put(`http://localhost:3000/list/${id}`, newDataObj,
              { headers: {"x-access-token" : `${token}`}});
    },

    async createList(boardId, name) {
        const response = await axios.post(`http://localhost:3000/list`, {"boardId": boardId, "title": name}, 
            { headers: {"x-access-token" : `${token}`}});
        return response.data; 
    },

    deleteList(listId) {
        axios.delete( `http://localhost:3000/list/${listId}`, { headers: { "x-access-token" : `${token}` }});
    }
}

export default listServices;