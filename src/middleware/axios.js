import axios from 'axios';

const setupAxiosInterceptors = onUnauthenticated => {
    const onRequestSuccess = config => {
        var token = localStorage.getItem('auth-token');
        if (token) {
            config.headers['Authorization'] = 'JWT '.concat(token);
        }
        config.timeout = 10000;
        return config;
    };
    const onResponseSuccess = (response) => response;
    const onResponseError = error => {
        if (error.status == 403) {
            localStorage.removeItem('auth-token');
            onUnauthenticated();
        }
        return Promise.reject(error);
    };
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export {
    setupAxiosInterceptors
};
