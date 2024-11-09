  import { Link, useNavigate, useLocation } from "react-router-dom";
  import { useState } from "react";
  import useAuth from "../hooks/useAuth";
  import logo from "../assets/PNG/logo-removebg.png";
  import styles from "../style/Navbar.module.css";
  import useLogout from "../hooks/useLogout";

  const Navbar = () => {
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
      await logout();
      navigate("/");
    };

    const isActive = (path) => location.pathname === path;

    const handleCustomEvent = (eventLabel) => {
      console.log(`Button clicked: ${eventLabel}`);
      // Add additional logic here for analytics, such as:
      // fbq('trackCustom', 'ButtonClicked', { buttonName: eventLabel });
    };

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    return (
      <section>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <Link to="/" onClick={() => handleCustomEvent('Home Button')}>
              <img src={logo} alt="Domna Logo" />
            </Link>
          </div>
          <div className={styles.hamburger} onClick={toggleMenu}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
          <ul className={`${styles.navMenu} ${isMenuOpen ? styles.activeMenu : ''}`}>
            <li>
              <Link
                to="/"
                className={`${styles.navLink} ${isActive("/") ? styles.activeNavLink : ""}`}
                onClick={() => {
                  handleCustomEvent('Home');
                  setIsMenuOpen(false);
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`${styles.navLink} ${isActive("/about") ? styles.activeNavLink : ""}`}
                onClick={() => {
                  handleCustomEvent('About');
                  setIsMenuOpen(false);
                }}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className={`${styles.navLink} ${isActive("/courses") ? styles.activeNavLink : ""}`}
                onClick={() => {
                  handleCustomEvent('Courses');
                  setIsMenuOpen(false);
                }}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={`${styles.navLink} ${isActive("/blog") ? styles.activeNavLink : ""}`}
                onClick={() => {
                  handleCustomEvent('Blog');
                  setIsMenuOpen(false);
                }}
              >
                Blog
              </Link>
            </li>
            {auth?.roles?.Admin && (
              <li>
                <Link
                  to="/dashboard"
                  className={`${styles.navLink} ${isActive("/dashboard") ? styles.activeNavLink : ""}`}
                  onClick={() => {
                    handleCustomEvent('Dashboard');
                    setIsMenuOpen(false);
                  }}
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
                    className={`${styles.navLink} ${isActive("/login") ? styles.activeNavLink : ""}`}
                    onClick={() => {
                      handleCustomEvent('Log in');
                      setIsMenuOpen(false);
                    }}
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={`${styles.navLink} ${isActive("/register") ? styles.activeNavLink : ""}`}
                    onClick={() => {
                      handleCustomEvent('Register');
                      setIsMenuOpen(false);
                    }}
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
                    className={`${styles.navLink} ${isActive(`/profile/${auth.id}`) ? styles.activeNavLink : ""}`}
                    onClick={() => {
                      handleCustomEvent('Profile');
                      setIsMenuOpen(false);
                    }}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleCustomEvent('Logout');
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className={styles.navLink}
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
