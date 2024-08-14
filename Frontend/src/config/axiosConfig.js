import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config({path: __dirname + '../.env'});
const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: `${apiUrl}`,
});

export default axiosInstance;