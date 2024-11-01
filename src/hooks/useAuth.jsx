// useAuth.js
import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const { auth, setAuth, persist, setPersist } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out");
    return { auth, setAuth, persist, setPersist };
};

export default useAuth;
