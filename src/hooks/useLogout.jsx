import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth, setLogoutPending } = useAuth(); // Ensure `setLogoutPending` is available if using

    const logout = async () => {
        try {
            setLogoutPending && setLogoutPending(true); // Indicate that logout is in progress
            const response = await axios('/logout', {
                withCredentials: true
            });
            // Clear auth state after the server responds
            setAuth({});
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            setLogoutPending && setLogoutPending(false); // Indicate that logout is complete
        }
    };

    return logout;
};

export default useLogout;
