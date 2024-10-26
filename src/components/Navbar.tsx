import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Navbar.css';

const Navbar = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { user, login, logout } = useContext(UserContext);

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(credentials);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">DOMNA</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Scopri chi sono</Link></li>
                <li><Link to="/style">Stile alimentare</Link></li>
                <li><Link to="/method">Metodo</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contatti</Link></li>
                <li><Link to="/courses">Corsi</Link></li>
            </ul>
            <div className="navbar-auth">
                {user ? (
                    <>
                        <Link to="/profile">Profilo</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <form onSubmit={handleLoginSubmit} className="login-form">
                        <input
                            type="email"
                            placeholder="Email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            required
                        />
                        <button type="submit">Log In</button>
                    </form>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
