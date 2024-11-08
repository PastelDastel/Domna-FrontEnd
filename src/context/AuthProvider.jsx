import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
    const [logoutPending, setLogoutPending] = useState(false); // Add logoutPending state

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist, logoutPending, setLogoutPending }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
