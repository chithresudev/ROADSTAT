import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../config/axiosConfig'; // Import the custom Axios instance
import {jwtDecode} from 'jwt-decode';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    AuthProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };
    const [user, setUser] = useState(null);
    const [currentEmail, setCurrentEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: null, type: null });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (error) {
                console.error('Error decoding token:', error);
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await axiosInstance.post('/api/auth/login', credentials);
            const { token, message } = response.data;
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            setUser(decoded);
            setMessage({ text: message, type: 'success' });
            navigate('/');
        } catch (error) {
            setMessage({ text: error.response.data.message || 'Login failed', type: 'error' });
        }
    };

    const register = async (firstName, lastName, email, password, username, userType, phoneNumber) => {
        try {
            const response = await axiosInstance.post('/auth/register', {
                firstName, lastName, email, password, username, userType, phoneNumber
            });
            const { message } = response.data;
            setMessage({ text: message, type: 'success' });
            navigate('/verify');
        } catch (error) {
            setMessage({ text: error.response.data.message || 'Registration failed', type: 'error' });
        }
    };

    const verifyEmail = async (email, verificationCode) => {
        try {
            const response = await axiosInstance.post('/auth/verify', { email, verificationCode });
            const { message } = response.data;
            setMessage({ text: message, type: 'success' });
            navigate('/login');
            setCurrentEmail('');
        } catch (error) {
            setMessage({ text: error.response.data.message || 'Email verification failed', type: 'error' });
        }
    };

    const setVerificationEmail = (email) => {
        setCurrentEmail(email);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setMessage({ text: 'Logged out successfully', type: 'success' });
        navigate('/login');
    };

    const clearMessage = () => {
        setMessage({ text: null, type: null });
    };

    return (
        <AuthContext.Provider value={{ user, loading, currentEmail, message, login, register, verifyEmail, logout, clearMessage, setVerificationEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
