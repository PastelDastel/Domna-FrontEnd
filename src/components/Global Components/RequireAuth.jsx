/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log("Require auth -> auth", auth);
    console.log("Require auth -> allowedRoles", allowedRoles);
    console.log("Require auth -> auth?.roles", auth?.roles);

    const hasRequiredRole = auth?.roles && typeof auth.roles === 'object'
        ? Object.keys(auth.roles).some(role => allowedRoles.includes(role))
        : allowedRoles.includes(auth?.roles);
    
    console.log("Require auth -> hasRequiredRole", hasRequiredRole);
    
    if (hasRequiredRole) {
        return <Outlet />;
    }

    if (auth?.accessToken) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
