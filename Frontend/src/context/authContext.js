import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            const { token, message } = response.data;
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            setUser(decoded);
            setSuccess(message);
            setError(null);
            navigate('/');
        } catch (error) {
            setError(error.response.data.message || 'Login failed');
            setSuccess(null);
        }
    };

    const register = async (firstName, lastName, email, password, username, userType, phoneNumber) => {
        try {
            const response = await axios.post('/api/auth/register', {
                firstName, lastName, email, password, username, userType, phoneNumber
            });
            const { message } = response.data;
            setSuccess(message);
            setError(null);
            navigate('/verify-email');
        } catch (error) {
            setError(error.response.data.message || 'Registration failed');
            setSuccess(null);
        }
    };

    const verifyEmail = async (email, verificationCode) => {
        try {
            const response = await axios.post('/api/auth/verify', { email, verificationCode });
            const { message } = response.data;
            setSuccess(message);
            setError(null);
            navigate('/login');
        } catch (error) {
            setError(error.response.data.message || 'Email verification failed');
            setSuccess(null);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setSuccess('Logged out successfully');
        navigate('/login');
    };

    const clearSuccess = () => {
        setSuccess(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, success, login, register, verifyEmail, logout, clearSuccess }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);