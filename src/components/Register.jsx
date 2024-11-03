import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import styles from "../style/Register.module.css"; // Import the CSS module

const REGISTER_URL = "/register";

const Register = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <section className={styles.registerContainer}>
          <h1>Success!</h1>
          <p>
            <Link to="/" className={styles.link}>
              Sign In
            </Link>
          </p>
        </section>
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
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username" className={styles.label}>
                Username:
              </label>
              <input
                type="text"
                id="username"
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
                ref={userRef}
                className={styles.inputField}
              />

              <label htmlFor="email" className={styles.label}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className={styles.inputField}
              />

              <label htmlFor="phone" className={styles.label}>
                Phone:
              </label>
              <input
                type="tel"
                id="phone"
                autoComplete="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
                className={styles.inputField}
              />

              <label htmlFor="password" className={styles.label}>
                Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={password ? styles.valid : styles.offscreen}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={password ? styles.offscreen : styles.invalid}
                />
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                value={password}
                required
                className={styles.inputField}
              />

              <label htmlFor="confirm_pwd" className={styles.label}>
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={
                    validMatch && matchPassword
                      ? styles.valid
                      : styles.offscreen
                  }
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validMatch || !matchPassword
                      ? styles.offscreen
                      : styles.invalid
                  }
                />
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPassword(e.target.value)}
                value={matchPassword}
                required
                aria-invalid={validMatch ? "false" : "true"}
                className={styles.inputField}
              />

              <button
                disabled={!username || !email || !phone || !password || !validMatch}
                className={styles.registerButton}
              >
                Sign Up
              </button>
            </form>
            <div className={styles.links}>
              Already registered?
              <Link to="/" className={styles.link}>
                Sign In
              </Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Register;
