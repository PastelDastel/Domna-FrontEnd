import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import styles from "../style/Home.module.css"; // Import the CSS module

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    return (
        <div className={styles.homeContainer}>
            <section className={styles.homeBox}>
                <h1>Home</h1>
                <p>You are logged in!</p>
                <Link to="/editor" className={styles.homeLink}>Go to the Editor page</Link>
                <Link to="/admin" className={styles.homeLink}>Go to the Admin page</Link>
                <Link to="/lounge" className={styles.homeLink}>Go to the Lounge</Link>
                <Link to="/linkpage" className={styles.homeLink}>Go to the link page</Link>
                <div className={styles.flexGrow}>
                    <button onClick={signOut} className={styles.signOutButton}>Sign Out</button>
                </div>
            </section>
        </div>
    )
}

export default Home;
