import React from "react";
import styles from "./Style.module.css";

const Footer = ({ onOpenCookieModal }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <a href="/">Home</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/termini">Termini e Condizioni</a>
          <button onClick={onOpenCookieModal} className={styles.cookieButton}>
            Preferenze Cookie
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
