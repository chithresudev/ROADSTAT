import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    AuthProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
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
            const { token } = response.data;
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            setUser(decoded);
            setError(null);
            navigate('/');
        } catch (error) {
            setError(error.response.data.message || 'Login failed');
        }
    };

    const register = async (userData) => {
        try {
            await axios.post('/api/auth/register', userData);
            setError(null);
            navigate('/verify-email');
        } catch (error) {
            setError(error.response.data.message || 'Registration failed');
        }
    };

    const verifyEmail = async (email, verificationCode) => {
        try {
            await axios.post('/api/auth/verify', { email, verificationCode });
            setError(null);
            navigate('/login');
        } catch (error) {
            setError(error.response.data.message || 'Email verification failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, verifyEmail, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
