import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth, setLogoutPending } = useAuth(); // Ensure `setLogoutPending` is available if using
    console.log("useLogout initialized");

    const logout = async () => {
        try {
            setLogoutPending && setLogoutPending(true); // Indicate that logout is in progress
            console.log("Logging out...");
            
            const response = await axios('/logout', {
                withCredentials: true
            });

            console.log("Logout response:", response);

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
