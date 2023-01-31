import axios from 'axios';

const api = axios.create({
    baseURL: process.env.URL
})

export default api