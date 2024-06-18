import axios from '../utils/CustomizeApi';

export const getAllYacht = () => {
    return axios.get('/api/customer/allYacht');
}
export const getAvatarYacht = () => {
    return axios.get('/api/companies/file');
}

export const login = (username, password) => {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    return axios.post('/login/signin', data)
}

export const registerCustomer = (username, password) => {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    return axios.post('/api/customer/accounts', data)
}

export const getAllYachtCompany = () => {
    return axios.get('/api/companies/allYacht');
}
export const getYachtById = (yachtId) => {
    return axios.get(`/api/companies/findYachtById/${yachtId}`);
}
export const deleteYacht = (idYacht) => {
    return axios.delete(`/api/companies/yacht/delete/${idYacht}`)
}

export const createYacht = (idCompany, name, image, launch, hullBody, description, rule, itinerary, idYachtType, idLocation) => {
    const data = new FormData()
    data.append('name', name);
    data.append('image', image);
    data.append('launch', launch);
    data.append('hullBody', hullBody);
    data.append('description', description);
    data.append('rule', rule);
    data.append('itinerary', itinerary);
    data.append('idYachtType', idYachtType);
    data.append('idLocation', idLocation);
    return axios.post(`/api/companies/yacht/insertYacht/${idCompany}`, data);
}



