import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config({path: __dirname + '../.env'});

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export default axiosInstance;