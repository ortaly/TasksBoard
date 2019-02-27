import axios from 'axios';

const listServices = {
    
    async getListCards(listId) {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`http://localhost:3000/list/${listId}/cards`, { headers: {"x-access-token" : `${token}`}});
        return response.data;
    },

    updateList(id, newDataObj) {
        const token = localStorage.getItem('userToken');
        axios.put(`http://localhost:3000/list/${id}`, newDataObj,
              { headers: {"x-access-token" : `${token}`}});
    }
}

export default listServices;