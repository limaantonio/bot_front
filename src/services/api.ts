import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-mylms.herokuapp.com/',
});

export default api;
