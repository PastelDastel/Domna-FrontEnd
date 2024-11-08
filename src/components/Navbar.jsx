import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/PNG/logo-removebg.png";
import styles from "../style/Navbar.module.css";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(auth);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  // Custom event handler for button clicks
  const handleCustomEvent = (eventLabel) => {
    console.log(`Button clicked: ${eventLabel}`);
    // Add additional logic here for analytics, such as:
     fbq('trackCustom', 'ButtonClicked', { buttonName: eventLabel });
  };

  return (
    <section>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/" onClick={() => handleCustomEvent('Home Button')}>
            <img src={logo} alt="Domna Logo" />
          </Link>
        </div>
        <ul className={styles.navMenu}>
          <li>
            <Link
              to="/"
              className={`${styles.navLink} ${isActive("/") ? styles.activeNavLink : ""}`}
              onClick={() => handleCustomEvent('Home')}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`${styles.navLink} ${isActive("/about") ? styles.activeNavLink : ""}`}
              onClick={() => handleCustomEvent('About')}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/courses"
              className={`${styles.navLink} ${isActive("/courses") ? styles.activeNavLink : ""}`}
              onClick={() => handleCustomEvent('Courses')}
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className={`${styles.navLink} ${isActive("/blog") ? styles.activeNavLink : ""}`}
              onClick={() => handleCustomEvent('Blog')}
            >
              Blog
            </Link>
          </li>
          {auth?.roles?.Admin && (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className={`${styles.navLink} ${isActive("/dashboard") ? styles.activeNavLink : ""}`}
                  onClick={() => handleCustomEvent('Dashboard')}
                >
                  Dashboard
                </Link>
              </li>
            </>
          )}
          {!auth?.accessToken ? (
            <>
              <li>
                <Link
                  to="/login"
                  className={`${styles.navLink} ${isActive("/login") ? styles.activeNavLink : ""}`}
                  onClick={() => handleCustomEvent('Log in')}
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`${styles.navLink} ${isActive("/register") ? styles.activeNavLink : ""}`}
                  onClick={() => handleCustomEvent('Register')}
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
                  onClick={() => handleCustomEvent('Profile')}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleCustomEvent('Logout');
                    handleLogout();
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
