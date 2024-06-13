import axios from "axios";
import NProgress from 'nprogress';


const instance = axios.create({
    baseURL: 'http://localhost:8080',

});

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
    // easing: 'ease',
    // speed: 500,
    // trickleRate: 0.5,
    // easing: 'ease',
    // speed: 200,
    // trickle: true,
    // trickleRate: 0.02
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    NProgress.start();
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //return Promise.reject(error);
    NProgress.done();
    return error;
});
export default instance;