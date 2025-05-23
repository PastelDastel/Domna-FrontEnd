import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.user?.roles;
      const id = response?.data?.user?.id;
      console.log("Response: ", response.data);
      setAuth({ email, roles, accessToken, id });
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    localStorage.setItem("persist", true);
  }, [persist]);

  return (
    <div className={styles.loginSection}>
      <section className={styles.loginForm}>
        <p
          ref={errRef}
          className={errMsg ? styles.errmsg : styles.offscreen}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Accedi al Tuo Profilo</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <div className={styles.inputWrapper}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
              <input
                type="email"
                id="email"
                ref={emailRef}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder="Inserisci la tua email"
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
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder="Inserisci la tua password"
                className={styles.inputField}
              />
            </div>
          </div>
          <button className={styles.loginButton}>Accedi</button>
        </form>
        <div className={styles.links}>
          Non hai un account?
          <Link to="/register" className={styles.link}>
            Registrati qui
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Login;
