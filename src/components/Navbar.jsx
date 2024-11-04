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

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <section>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="Domna Logo" />
          </Link>
        </div>
        <ul className={styles.navMenu}>
          <li>
            <Link
              to="/"
              className={`${styles.navLink} ${
                isActive("/") ? styles.activeNavLink : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`${styles.navLink} ${
                isActive("/about") ? styles.activeNavLink : ""
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/courses"
              className={`${styles.navLink} ${
                isActive("/courses") ? styles.activeNavLink : ""
              }`}
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className={`${styles.navLink} ${
                isActive("/blog") ? styles.activeNavLink : ""
              }`}
            >
              Blog
            </Link>
          </li>
          {auth?.roles?.includes("Admin") && (
            <>
              <li>
                <Link
                  to="/createcourse"
                  className={`${styles.navLink} ${
                    isActive("/createcourse") ? styles.activeNavLink : ""
                  }`}
                >
                  Create Course
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className={`${styles.navLink} ${
                    isActive("/dashboard") ? styles.activeNavLink : ""
                  }`}
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
                  className={`${styles.navLink} ${
                    isActive("/login") ? styles.activeNavLink : ""
                  }`}
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`${styles.navLink} ${
                    isActive("/register") ? styles.activeNavLink : ""
                  }`}
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
                  className={`${styles.navLink} ${
                    isActive(`/profile/${auth.id}`) ? styles.activeNavLink : ""
                  }`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className={styles.navLink}>
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
