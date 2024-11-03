import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from "../style/Login.module.css";
import axios from '../api/axios';

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response.data);
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.user?.roles;
            const id = response?.data?.user?.id;
            setAuth({ email, roles, accessToken, id });
            setEmail('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (
        <div className={styles.loginContainer}>
            <section className={styles.loginForm}>
                <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen} aria-live="assertive">{errMsg}</p>
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        ref={emailRef}
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className={styles.inputField}
                    />

                    <label htmlFor="password" className={styles.label}>Password:</label>
                    <div className={styles.passwordContainer}>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.rememberMe}>
                        <input
                            type="checkbox"
                            id="persist"
                            onChange={togglePersist}
                            checked={persist}
                        />
                        <label htmlFor="persist" className={styles.label}>Trust This Device</label>
                    </div>

                    <button className={styles.loginButton}>Sign In</button>
                </form>
                <div className={styles.links}>
                    Need an Account?
                    <Link to="/register" className={styles.link}>Sign Up</Link>
                </div>
            </section>
        </div>
    )
}

export default Login;
