import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create({
  baseURL: config.API_BASE_URL
});

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const fireRequest = async (method, fullUrl, data) => {
    const options = {
        method,
        timeout: 4000,
        data: data || {}
    };

    try {
        const res = axiosInstance(fullUrl, options);
        const fullResponse = await res;
        return fullResponse.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export default {
    get(url) {
        return fireRequest('GET', url);
    },

    post(url, data) {
        return fireRequest('POST', url, data);
    },

    put(url, data) {
        return fireRequest('PUT', url, data);
    },

    delete(url) {
        return fireRequest('DELETE', url);
    },

    axios() {
        return axiosInstance;
    }
};
