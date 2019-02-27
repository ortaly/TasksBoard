import axios from 'axios';

const userServices = {
    async login(email, password) {
        const response = await axios.post('http://localhost:3000/user/login', {"email": email, "password": password});
        return response.data;
    },

    async getBoards() {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:3000/user/boards', { headers: {"x-access-token" : `${token}`}});
        return response.data;
    }
}

export default userServices;