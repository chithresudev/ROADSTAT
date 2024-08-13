import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ element: Element, roles, ...rest }) => {
    const location = useLocation();
    const { user } = useAuth();

    // If not logged in, redirect to login page with the return URL
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // If roles are specified and the user does not have the required role
    if (roles && roles.length && !roles.includes(user.role)) {
        // Redirect to the home page or another appropriate route
        return <Navigate to="/" />;
    }

    // If everything is okay, render the desired element
    return <Element {...rest} />;
};

PrivateRoute.propTypes = {
    element: PropTypes.elementType.isRequired, // Ensures that the element prop is a React component
    roles: PropTypes.arrayOf(PropTypes.string), // Ensures that roles is an array of strings
};

export default PrivateRoute;