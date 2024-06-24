import axios from '../utils/CustomizeApi';


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
export const getAllYacht = () => {
    return axios.get('/api/customer/allYacht');
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

export const getRoomByYacht = (yachtId) => {
    return axios.get(`/api/customer/getRoomByYacht/${yachtId}`)
}
export const getRoomById = (roomId) => {
    return axios.get(`/api/customer/getRoomById/${roomId}`)
}
export const fillInformationCustomer = (idCustomer, fullName, email, phoneNumber, address) => {
    const data = new FormData()
    data.append('fullName', fullName);
    data.append('email', email);
    data.append('phoneNumber', phoneNumber);
    data.append('address', address);

    return axios.put(`/api/customer/profile/${idCustomer}`, data);
}

export const fillInformationCompany = (idCompany, name, address, logo, email) => {
    const data = new FormData()
    data.append('name', name);
    data.append('email', email);
    data.append('logo', logo);
    data.append('address', address);

    return axios.put(`/api/customer/profile/${idCompany}`, data);
}

export const getAllLocation = () => {
    return axios.get('/api/companies/getAllLocation');
}

export const createYachtImage = (idYacht, image) => {
    const data = new FormData();
    data.append('image', image);
    return axios.post(`/api/companies/yacht/addImage/${idYacht}`, data);
}

export const getYachtImage = (idYacht) => {
    return axios.get(`/api/companies/yacht/image/${idYacht}`);
}

export const deleteYachtImage = (idImage) => {
    return axios.delete(`/api/companies/yacht/deleteImage/${idImage}`);
}

export const updateYachtImage = (idImage, image) => {
    const data = new FormData();
    data.append('image', image)
    return axios.put(`/api/companies/yacht/updateImage/${idImage}`, data);
}

export const getFeedbackCompany = (idCompany) => {
    return axios.get(`/api/companies/feedBackByIdCompany/${idCompany}`)
}

export const getScheduleByYacht = (yachtId) => {
    return axios.get(`/api/customer/getScheduleByYacht/${yachtId}`)
}

export const getUnbookedRoomsByYachtAndSchedule = (yachtId, scheduleId) => {
    return axios.get(`/api/customer/getUnbookedRoomsByYachtAndSchedule/${yachtId}/${scheduleId}`)
}


