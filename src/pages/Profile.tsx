import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1>Profile</h1>
                <p>Welcome, {user.name}!</p>
                <p>Email: {user.email}</p>
            </div>
        </div>
    );
};

export default Profile;
