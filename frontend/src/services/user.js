import axios from 'axios';

const token = localStorage.getItem('userToken');
const userServices = {
    async login(userLogin) {
        const response = await axios.post('http://localhost:3000/user/login', userLogin);
        return response.data;
    },

    async getBoards() {
        const response = await axios.get('http://localhost:3000/user/boards', { headers: {"x-access-token" : `${token}`}});
        return response.data;
    },

    async register(firstName, lastName, email, password) {
        const response = await axios.post('http://localhost:3000/user/create', {"firstName": firstName, "lastName": lastName, "email": email, "password": password});
        return response.data;
        
    }
}

export default userServices;