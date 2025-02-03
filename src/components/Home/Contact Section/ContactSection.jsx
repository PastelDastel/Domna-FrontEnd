import React from "react";
import { Link } from "react-router-dom";
import style from "./ContactSection.module.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
const ContactSection = () => {
  const axiosPrivate = useAxiosPrivate();
  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      nome: formData.get("name"),
      cognome: formData.get("surname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };
    try {

      const submit = async () => {
        console.log(data);
        const res = await axiosPrivate.post("/newsletter", data);
        console.log(res);
        alert("Iscrizione avvenuta con successo!");
        e.target.reset();
      };
      submit();
    } catch (err) {
      console.log(err);
      alert("Errore nell'iscrizione alla newsletter");
    }
  };
  return (
    <div className={style.contactSection}>
      <div className={style.container}>
        <h2 className={style.contactTitle}>Ricevi La Newsletter Del Sito</h2>
        <p className={style.contactSubtitle}>Resta sempre aggiornata!</p>

        <form className={style.contactForm} onSubmit={submitForm}>
          <div className={style.inputGroup}>
            <div className={style.nameGroup}>
              <input type="text" placeholder="Nome" required name="name"/>
              <input type="text" placeholder="Cognome" required name="surname"/>

            </div>

            <input type="email" placeholder="Email" required name="email"/>
            <input type="text" placeholder="Telefono" required name="phone"/>
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
