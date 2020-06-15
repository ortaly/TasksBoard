import api from './api'; 

const token = localStorage.getItem('userToken');
const boardServices = {
    async getBoardLists(boardId) {
        const response = await api.get(`http://localhost:3000/board/${boardId}/lists`, { headers: {"x-access-token" : `${token}`}});
        return response.data;
    },

    async createNewBoard(userId, boardName) {
        const response = await api.post(`http://localhost:3000/board`, {"userId": userId, "name": boardName}, { headers: {"x-access-token" : `${token}`}});
        return response.data;
    }
}

export default boardServices;