import { useNavigate } from "react-router-dom";
import styles from "./Unauthorized.module.css"; // Import the CSS module

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div className={styles.unauthorizedContainer}>
            <section className={styles.unauthorizedBox}>
                <h1>Unauthorized</h1>
                <p>You do not have access to the requested page.</p>
                <div className={styles.flexGrow}>
                    <button onClick={goBack} className={styles.goBackButton}>
                        Go Back
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Unauthorized;
