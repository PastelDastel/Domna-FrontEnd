import React from "react";
import { Link } from "react-router-dom";
import style from "./ContactSection.module.css";
import axios from "axios";
const ContactSection = () => {

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      surname: formData.get("surname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };
    try {
      const res = axios.post("https://domna-backend-1.onrender.com/newsletter", data);
      console.log(res);
      return;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={style.contactSection}>
      <div className={style.container}>
        <h2 className={style.contactTitle}>Ricevi La Newsletter Del Sito</h2>
        <p className={style.contactSubtitle}>Resta sempre aggiornata!</p>

        <form className={style.contactForm}>
          <div className={style.inputGroup}>
            <div className={style.nameGroup}>
              <input type="text" placeholder="Nome" required />
              <input type="text" placeholder="Cognome" required />

            </div>

            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Telefono" required />
          </div>
          <button
            type="submit"
            className={style.contactButton}
          >
            Invia
          </button>
        </form>

        <p className={style.footerDetails}>
          DOMNA di Fruttero Marcella – P.IVA: 03933450045 – Via Monsignor Angelo Soracco 79 – 12045 Fossano (CN) –
          <Link to="/privacy" className={style.navlink}>
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ContactSection;
