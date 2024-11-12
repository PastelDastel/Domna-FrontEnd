import React from "react";
import styles from "./ContactSection.module.css";
import { Link } from "react-router-dom";
const ContactSection = () => {
  return (
    <div className={`${styles.contactSection}`}>
      <div className={styles.container}>
        <h2 className={styles.contactTitle}>Ricevi La Newsletter Del Sito</h2>
        <p className={styles.contactSubtitle}>Resta sempre aggiornata!</p>

        <form className={styles.contactForm}>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Nome" required />
            <input type="text" placeholder="Cognome" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Telefono" required />
          </div>
          <button type="submit" className={styles.contactButton}>
            Invia
          </button>
        </form>

        <p className={styles.footerDetails}>
          DOMNA di Fruttero Marcella – P.IVA: 03933450045 – Via Monsignor Angelo
          Soracco 79 – 12045 Fossano (CN) –
          <Link to="/privacy" className={styles.privacyLink}>
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ContactSection;
