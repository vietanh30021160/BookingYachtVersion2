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
const getAllYachtt = () => {
    return axios.get('/api/companies/allYacht');
}
const getAvatarYacht = () => {
    return axios.get('/api/companies/file');
}


export { getUser, login, register, getAllYachtt };