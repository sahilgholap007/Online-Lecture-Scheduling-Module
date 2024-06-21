import axios from 'axios';

const api = axios.create({
  baseURL: 'https://online-lecture-scheduling-module-ajjh.onrender.com/api',
});

export default api;
