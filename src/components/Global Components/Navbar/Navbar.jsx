import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/PNG/logo-removebg.png";
import useLogout from "../../../hooks/useLogout";
import style from "./Navbar.module.css"; // Ensure this is your normal CSS file

const Navbar = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const handleCustomEvent = (eventLabel) => {
    console.log(`Button clicked: ${eventLabel}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  // Role check function
  const hasRole = (roleValue) => auth?.roles && auth.roles === roleValue;

  return (
    <nav className={style.navbar} ref={menuRef} onClick={(e) => e.stopPropagation()}>
      {/* Logo Section */}
      <div className={style.logo}>
        <Link to="/" onClick={() => handleCustomEvent('Home Button')}>
          <img src={logo} id="logonav" alt="Domna Logo" />
        </Link>
      </div>

      {/* Hamburger Menu */}
      <div className={style.hamburgerMenu} id="hamburgerMenu" onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </div>

      {/* Navigation Menu */}
      <ul className={`${style.navMenu} ${isMenuOpen ? style.open : ''}`} id="navMenu">
        <li>
          <Link
            to="/"
            className={`${style.link} ${isActive("/") ? style.active : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`${style.link} ${isActive("/about") ? style.active : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/courses"
            className={`${style.link} ${isActive("/courses") ? style.active : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Corsi
          </Link>
        </li>
        <li>
          <Link
            to="/blog"
            className={`${style.link} ${isActive("/blog") ? style.active : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
        </li>
        {/* Check for admin role */}
        {hasRole(6792941695628669) && (
          <li>
            <Link
              to="/dashboard"
              className={`${style.link} ${isActive("/dashboard") ? style.active : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
        )}
        {auth?.accessToken ? (
          <>
            <li>
              <Link
                to="/shopping-cart"
                className={`${style.link} ${isActive("/shopping-cart") ? style.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link
                to={`/profile/${auth.id}`}
                className={`${style.link} ${isActive(`/profile/${auth.id}`) ? style.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout} className={style.link}>
                LOGOUT
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className={`${style.link} ${isActive("/login") ? style.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className={`${style.link} ${isActive("/register") ? style.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
