import axios from '../utils/CustomizeApi';

const getUser = () => {
    return axios.get(`/api/users`);
}

const login = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const register = (email, password) => {
    return axios.post('/api/register', { email, password });
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