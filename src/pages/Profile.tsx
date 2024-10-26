import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user) {
        // Redirect to login if no user is logged in
        navigate('/login');
        return null;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>Welcome, {user.name}!</p>
            <p>Email: {user.email}</p>
            {/* You can add more user details here */}
        </div>
    );
};

export default Profile;
