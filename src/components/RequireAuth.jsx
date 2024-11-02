import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log("auth:", auth);

    const rolesArray = Array.isArray(auth?.roles) ? auth.roles : [auth.roles];
    const hasRequiredRole = rolesArray.some(role => allowedRoles.includes(role));

    if (hasRequiredRole) {
        return <Outlet />;
    }

    if (auth?.accessToken) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
