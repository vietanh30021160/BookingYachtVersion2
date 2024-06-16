import axios from '../utils/CustomizeApi';

const getUser = () => {
    return axios.get(`https://reqres.in/api/users`);
}

const login = (username, password) => {
    return axios.post('/login/signin', { username, password })
}

const register = (email, password) => {
    return axios.post('https://reqres.in/api/register', { email, password });
}
const getAllYachtHome = () => {
    return axios.get('/api/customer/allYacht');
}
const getAvatarYacht = () => {
    return axios.get('/api/customer/file');
}
const getYachtService = () => {
    return axios.get('/api/customer/getAllService')
}


export { getUser, login, register, getAllYachtHome, getAvatarYacht, getYachtService };