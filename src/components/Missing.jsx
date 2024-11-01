import { Link } from "react-router-dom";
import styles from "../style/Missing.module.css"; // Import the CSS module

const Missing = () => {
    return (
        <div className={styles.missingContainer}>
            <article className={styles.missingBox}>
                <h1>Oops!</h1>
                <p>Page Not Found</p>
                <div className={styles.flexGrow}>
                    <Link to="/" className={styles.homeLink}>Visit Our Homepage</Link>
                </div>
            </article>
        </div>
    );
}

export default Missing;
