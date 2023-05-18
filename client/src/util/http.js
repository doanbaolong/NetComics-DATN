import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
    async function (config) {
        // Do something before request is sent
        // attach token to header
        let token =
            localStorage.getItem('persist:auth') &&
            JSON.parse(localStorage.getItem('persist:auth'))?.token?.slice(1, -1);
        config.headers = {
            authorization: token ? `Bearer ${token}` : null,
        };

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // refresh token
        return response;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default instance;
