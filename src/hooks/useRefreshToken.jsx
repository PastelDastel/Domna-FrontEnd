import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    console.log("useRefreshToken used");
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        console.log("useRefreshToken data after logout:", response.data);
        
        console.log("useRefreshToken data:",response.data);
        setAuth(prev => {
            return {
                ...prev,
                roles: response.data.user.roles,
                id : response.data.user.id,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
