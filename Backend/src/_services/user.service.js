// import config from 'config';
import { authHeader, handleResponse } from '../_helpers';
const apiUrl = process.env.VITE_API_URL;

export const userService = {
    getAll,
    getById
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${apiUrl}/users`, requestOptions).then(handleResponse);
}

async function getById(id) {
    // const requestOptions = { method: 'GET', headers: authHeader() };

    const response = await fetch(`${apiUrl}/users/${id}`);
    const data = await response.json();
    return data;
}