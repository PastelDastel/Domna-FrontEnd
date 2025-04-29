/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const roles = auth?.roles || [];
    const hasRequiredRole = allowedRoles?.some((role) => roles.includes(role));
    console.log("allowedRoles", allowedRoles);
    console.log("roles", roles);
    console.log("hasRequiredRole", hasRequiredRole);
    if (hasRequiredRole) {
        return <Outlet />;
    }

    if (auth?.accessToken) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
