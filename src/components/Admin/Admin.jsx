import { Link } from "react-router-dom";
import Users from '../Users/Users';
import styles from "./Admin.module.css"; // Import the CSS module

const Admin = () => {
    return (
        <div className={styles.adminContainer}>
            <section className={styles.adminBox}>
                <h1>Admins Dashboard</h1>
                <Users />
                <Link to="/" className={styles.homeLink}>Home</Link>
            </section>
        </div>
    );
}

export default Admin;
