import axios from 'axios';

const api = axios.create({
    // baseURL: process.env.REACT_APP_API_URL
    baseURL: `http://localhost:${process.env.PORT}`
})

export default api