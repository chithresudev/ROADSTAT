import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { authenticationService } from '@/_services';
import { HomePage } from '@/HomePage';
import { AdminPage } from '@/AdminPage';
import { LoginPage } from '@/LoginPage';


const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentUser = authenticationService.currentUserValue;

    if (!currentUser) {
        // Not logged in, redirect to login page with the return URL
        return (
            <Routes>
                {/* <Route {...rest} element={<LoginPage />} /> */}
                {/* <Route {...rest} element={LoginPage} /> */}
                <Route {...rest} element={<LoginPage />} />
            </Routes>
        )
    }

    if (roles && roles.indexOf(currentUser.role) === -1) {
        // Role not authorized, redirect to home page
        return (
            <Routes>
                {/* <Route {...rest} element={<Navigate to="/" />} /> */}
                <Route {...rest} element={<HomePage />} />
                {/* <Route {...rest} element={HomePage} /> */}
            </Routes>
        )
    }

    return (
        <Routes>
            {/* <Route {...rest} element={AdminPage} /> */}
            <Route {...rest} element={<HomePage />} />
        </Routes>
    );

    // return (
    //     // <Route {...rest} render={props => {
    //     <Routes>
    //     <Route {...rest} element={props => {
    //         const currentUser = authenticationService.currentUserValue;
    //         if (!currentUser) {
    //             // not logged in so redirect to login page with the return url
    //             // return <Navigate to={{ pathname: '/login', state: { from: location } }} />;
    //             navigate('/login', { state: { from: location } });
    //             return null;
    //         }

    //         // check if route is restricted by role
    //         if (roles && roles.indexOf(currentUser.role) === -1) {
    //             // role not authorised so redirect to home page
    //             // return <Navigate to={{ pathname: '/' }} />;
    //             navigate('/');
    //             return null;
    //         }

    //         // authorised so return component
    //         return <Component {...props} />;
    //     }} />
    //     </Routes>
    // );
};

export { PrivateRoute };
