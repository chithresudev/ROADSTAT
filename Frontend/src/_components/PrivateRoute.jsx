import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { authenticationService } from '../../../Backend/src/_services';
import { LoginPage } from '@/LoginPage';
import { AdminPage } from '@/AdminPage';
import Profile from '../ProfilePage/profile';
import HomePage from '../HomePage/Home';


const PrivateRoute = ({ element: Element, roles, ...rest }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentUser = authenticationService.currentUserValue;

    if (!currentUser) {
        // Not logged in, redirect to login page with the return URL
        return (
            <Routes>
                <Route {...rest} element={<LoginPage />} />
            </Routes>
        )
    }

    // if (roles && roles.indexOf(currentUser?.role) === -1) {
    //     // Role not authorized, redirect to home page
    //     return (
    //         <Routes>
    //             {/* <Route {...rest} element={<HomePage />} /> */}
    //         </Routes>
    //     )
    // }

    if (roles && roles.includes(currentUser?.role)) {
        
        return (
            <Routes>
                <Route {...rest} element={Element} />
            </Routes>
        )
    }

    return (
        <Routes>
            {/* <Route {...rest} element={AdminPage} /> */}
            {/* <Route {...rest} element={<HomePage />} /> */}
            <Route {...rest} element={Element} />
        </Routes>
    );
};

export { PrivateRoute };
