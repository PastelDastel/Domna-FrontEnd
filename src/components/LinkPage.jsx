import { Link } from "react-router-dom";
import styles from "../style/LinkPage.module.css"; // Import the CSS module

const LinkPage = () => {
    return (
        <div className={styles.linkPageContainer}>
            <section className={styles.linkPageBox}>
                <h1>Links</h1>
                <div className={styles.sectionSpacing}>
                    <h2>Public</h2>
                    <Link to="/login" className={styles.link}>Login</Link>
                    <Link to="/register" className={styles.link}>Register</Link>
                </div>
                <div className={styles.sectionSpacing}>
                    <h2>Private</h2>
                    <Link to="/" className={styles.link}>Home</Link>
                    <Link to="/editor" className={styles.link}>Editors Page</Link>
                    <Link to="/admin" className={styles.link}>Admin Page</Link>
                </div>
            </section>
        </div>
    );
}

export default LinkPage;
