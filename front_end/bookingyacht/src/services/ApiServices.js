import axios from '../utils/CustomizeApi';

const getUser = () => {
    return axios.get(`/api/users`);
}

const login = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const register = (email, password) => {
    return axios.post('https://reqres.in/api/register', { email, password });
}
const getAllYachtt = () => {
    return axios.get('/api/companies/allYacht');
}
// const getAvatarYacht = () => {
//     return axios.get('/api/companies/file');
// }

const loginCustomer = (username, password) => {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    return axios.post('http://localhost:8080/login/signin', data)
}

const registerCustomer = (username, password) => {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    return axios.post('http://localhost:8080/api/customer/accounts', data)
}


export { getUser, login, register, loginCustomer, registerCustomer };
