// import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';
const apiUrl = import.meta.env.VITE_API_URL;

export const userService = {
    getAll,
    getById
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${apiUrl}/users`, requestOptions).then(handleResponse);
    // return fetch('http://localhost:3000/api/users', requestOptions).then(handleResponse);
}

async function getById(id) {
    // const requestOptions = { method: 'GET', headers: authHeader() };
    // return fetch(`${process.env.VITE_API_URL}/users/${id}`, requestOptions).then(handleResponse);

    const response = await fetch(`${apiUrl}/users/${id}`);
    const data = await response.json();
    return data;
}