import axios from 'axios';

const axiosApiInstance = axios.create({
  baseURL: 'https://blog.kata.academy/api/',
});

axiosApiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const configure = config;

    if (token && configure.headers) {
      configure.headers.Authorization = `Bearer ${token}`;
    }

    return configure;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
