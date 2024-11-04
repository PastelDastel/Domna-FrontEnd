import { Link } from "react-router-dom";
import styles from "../style/Missing.module.css"; // Import the CSS module

const Missing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <h1>404</h1>
        <p>Oops! La pagina che stai cercando non esiste.</p>
        <Link to="/" className={styles.backHome}>
          Torna alla home
        </Link>
      </div>
    </div>
  );
};

export default Missing;
