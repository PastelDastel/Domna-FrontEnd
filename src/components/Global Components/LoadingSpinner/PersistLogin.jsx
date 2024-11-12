// PersistLogin.js
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../../../hooks/useRefreshToken';
import useAuth from '../../../hooks/useAuth';
import styles from "./LoadingSpinner.module.css"; // Import the spinner CSS module

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        if (!auth?.accessToken && persist) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }

        return () => isMounted = false;
    }, [auth?.accessToken, persist, refresh]);

    return (
        <>
            {!persist ? (
                <Outlet />
            ) : isLoading ? (
                <div className={styles.spinnerContainer}>
                    <div className={styles.spinner}></div>
                </div>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default PersistLogin;
