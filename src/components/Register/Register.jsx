/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faEnvelope, faUser, faPhone, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const REGISTER_URL = "/register";

const Register = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, phone, password, matchPassword]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !phone || !password || !matchPassword) {
      setErrMsg("Tutti i campi sono obbligatori");
      errRef.current.focus();
      return;
    }
    if (!validMatch) {
      setErrMsg("Le password non corrispondono");
      errRef.current.focus();
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, email, phone, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess(true);
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");
      setMatchPassword("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <div className={styles.successMessage}>
          <p>Registrazione avvenuta con successo! Verrai reindirizzato...</p>
        </div>
      ) : (
        <div className={styles.registerContainer}>
          <section className={styles.registerForm}>
            <p
              ref={errRef}
              className={errMsg ? styles.errorMessage : styles.offscreen}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Registra un nuovo account</h1>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputContainer}>
                <label htmlFor="username" className={styles.label}>
                  Nome Completo
                </label>
                <div className={styles.inputWrapper}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon} />
                  <input
                    placeholder="Inserisci il tuo Nome e Cognome"
                    type="text"
                    id="username"
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                    ref={userRef}
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <div className={styles.inputWrapper}>
                  <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                  <input
                    placeholder="Inserisci la tua email"
                    type="email"
                    id="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    className={styles.inputField}
                  />
                </div>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="phone" className={styles.label}>
                  Telefono
                </label>
                <div className={styles.inputWrapper}>
                  <FontAwesomeIcon icon={faPhone} className={styles.icon} />
                  <input
                    placeholder="Inserisci il tuo numero di telefono"
                    type="tel"
                    id="phone"
                    autoComplete="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    required
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <div className={styles.inputWrapper}>
                  <FontAwesomeIcon icon={faLock} className={styles.icon} />
                  <input
                    placeholder="Inserisci la tua password"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    value={password}
                    required
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="confirm_pwd" className={styles.label}>
                  Conferma Password
                </label>
                <div className={styles.inputWrapper}>
                  <FontAwesomeIcon icon={faLock} className={styles.icon} />
                  <input
                    placeholder="Conferma la tua password"
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPassword(e.target.value)}
                    value={matchPassword}
                    required
                    className={styles.inputField}
                  />
                </div>
              </div>

              <button className={styles.registerButton}>Registrati</button>
            </form>
            <div className={styles.links}>
              Hai già un account?
              <Link to="/login" className={styles.link}>
                Accedi qui
              </Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Register;
