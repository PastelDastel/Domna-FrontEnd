/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const hasRequiredRole = auth?.roles && typeof auth.roles === 'object'
        ? Object.keys(auth.roles).some(role => allowedRoles.includes(role))
        : allowedRoles.includes(auth?.roles);    
    if (hasRequiredRole) {
        return <Outlet />;
    }

    if (auth?.accessToken) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
