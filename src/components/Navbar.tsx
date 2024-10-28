import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Navbar.css';
import logo from '../assets/logo-removebg.png'; 

const Navbar = () => {
    const { user, logout } = useContext(UserContext);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="DOMNA Logo" className="logo-img" /> {/* Use the logo */}
                </Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/discover">Scopri chi sono</Link></li>
                <li><Link to="/style">Stile alimentare</Link></li>
                <li><Link to="/method">Metodo</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contatti</Link></li>
                <li><Link to="/courses">Corsi</Link></li>
            </ul>
            <div className="navbar-auth">
                {user ? (
                    <>
                        <Link to="/my-courses">My courses</Link>
                        <Link to="/profile">Profilo</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/register">Registrati</Link>
                        <Link to="/login">Log In</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
