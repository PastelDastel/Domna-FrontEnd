import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo-removebg.png";
import styles from "../style/Navbar.module.css"; // Import as styles
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/linkpage");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link to="/">
          <img src={logo} alt="DOMNA Logo" className={styles.logoImg} />
        </Link>
      </div>
      <ul className={styles.navbarLinks}>
        <li>
          <Link to="/discover">Scopri chi sono</Link>
        </li>
        <li>
          <Link to="/style">Stile alimentare</Link>
        </li>
        <li>
          <Link to="/method">Metodo</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/contact">Contatti</Link>
        </li>
        <li>
          <Link to="/courses">Corsi</Link>
        </li>

        {/* Show these links only if the user has the Admin role */}
        {auth?.roles?.includes(5150) && (
          <>
            <li>
              <Link to="/createcourse">Create Course</Link>
            </li>
            <li>
              <Link to="/admin">Dashboard</Link>
            </li>
          </>
        )}

        {/* Authentication links */}
        {!auth?.accessToken ? (
          <div className={styles.navbarAuth}>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </div>
        ) : (
          <div className={styles.navbarAuth}>
            <li>
              <Link to={`/profile/${auth.id}`}>Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
