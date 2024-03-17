// import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const userService = {
    getAll,
    getById
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${process.env.CONFIG_API_URL.apiUrl}/users`, requestOptions).then(handleResponse);
    // return fetch('http://localhost:3000/api/users', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${process.env.CONFIG_API_URL.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}