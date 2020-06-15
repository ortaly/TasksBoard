import api from './api'; 

const token = localStorage.getItem('userToken');
const userServices = {
    async login(email, password) {
        const response = await api.post('http://localhost:3000/user/login', {"email": email, "password": password});
        return response.data;
    },

    async getBoards() {
        const response = await api.get('http://localhost:3000/user/boards', { headers: {"x-access-token" : `${token}`}});
        return response.data;
    },

    async register(firstName, lastName, email, password) {
        const response = await api.post('http://localhost:3000/user/create', {"firstName": firstName, "lastName": lastName, "email": email, "password": password});
        return response.data;
        
    }
}

export default userServices;