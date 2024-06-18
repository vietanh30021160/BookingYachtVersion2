import axios from '../utils/CustomizeApi';

export const getUser = () => {
    return axios.get(`/api/users`);
}
export const login = (email, password) => {
    return axios.post('/api/login', { email, password })
}
export const register = (email, password) => {
    return axios.post('/api/register', { email, password });
}
export const getAllYachtHome = () => {
    return axios.get('/api/customer/allYacht');
}
export const getAvatarYacht = () => {
    return axios.get('/api/customer/file');
}
export const getYachtService = () => {
    return axios.get('/api/customer/getAllService')
}
export const getYachtByYachtId = (id) => {
    return axios.get(`api/customer/findYachtById/${id}`)
}
export const getServiceByYacht = (yachtId) => {
    return axios.get(`api/customer/getServiceByYacht/${yachtId}`)
}
export const getImagesYacht = (yachtId) => {
    return axios.get(`api/customer/yacht/image/${yachtId}`)
}
