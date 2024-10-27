import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { UserContext } from '../../context/UserContext';

const Login: React.FC = () => {

    useEffect(() => {
        logout(); // Ensure the user is logged out when the login page is rendered
    }, []);

    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { login, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleShowPasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Attempt login and redirect on success
        try {
            await login(credentials);
            navigate('/profile'); // Redirect to the profile page on successful login
        } catch (error) {
            console.error("Login failed:", error);
            // Optionally display an error message here
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLoginSubmit} className="login-form">
                <h2>Accedi</h2>
                <label htmlFor="email">Nome utente o indirizzo email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    required
                />

                <label htmlFor="password">Password</label>
                <div className="password-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        required
                    />
                    <span onClick={handleShowPasswordToggle} className="show-password">
                        {showPassword ? 'Hide Password' : 'Show Password'}
                    </span>
                </div>

                <div className="remember-me">
                    <input type="checkbox" id="rememberMe" name="rememberMe" />
                    <label htmlFor="rememberMe">Ricordami</label>
                </div>

                <button type="submit" className="login-button">Accedi</button>

                <div className="links">
                    <a href="/register">Iscriviti adesso</a>
                    <a href="/forgot-password">Password dimenticata?</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
