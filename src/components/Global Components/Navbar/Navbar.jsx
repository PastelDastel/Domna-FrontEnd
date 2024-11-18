import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/PNG/logo-removebg.png";
import styles from "./Navbar.module.css";
import useLogout from "../../../hooks/useLogout";
import { Turn as Hamburger } from 'hamburger-react';

const Navbar = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const handleCustomEvent = (eventLabel) => {
    console.log(`Button clicked: ${eventLabel}`);
  };

  return (
    <section>
      <nav className={styles.navbar}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <Link to="/" onClick={() => handleCustomEvent("Home Button")}>
            <img src={logo} alt="Domna Logo" />
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className={styles.hamburgerMenu}>
          <Hamburger
            toggled={isMenuOpen}
            toggle={setIsMenuOpen}
            color="#d75494"
            size={28}
          />
        </div>

        {/* Navigation Menu */}
        <ul className={`${styles.navMenu} ${isMenuOpen ? styles.open : ""}`}>
          <li>
            <Link
              to="/"
              className={`${styles.link} ${isActive("/") ? styles.active : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`${styles.link} ${isActive("/about") ? styles.active : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/courses"
              className={`${styles.link} ${isActive("/courses") ? styles.active : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className={`${styles.link} ${isActive("/blog") ? styles.active : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
          </li>
          {auth?.roles?.Admin && (
            <li>
              <Link
                to="/dashboard"
                className={`${styles.link} ${isActive("/dashboard") ? styles.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>
          )}
          {!auth?.accessToken ? (
            <>
              <li>
                <Link
                  to="/login"
                  className={`${styles.link} ${isActive("/login") ? styles.active : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`${styles.link} ${isActive("/register") ? styles.active : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to={`/profile/${auth.id}`}
                  className={`${styles.link} ${isActive(`/profile/${auth.id}`) ? styles.active : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className={styles.link}
                >
                  LOGOUT
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
