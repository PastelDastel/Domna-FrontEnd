import styles from "./Style.module.css";
import { useState, useEffect } from "react";

const Component = ({ isOpen, setIsOpen }) => { // Accept props
    const [preferences, setPreferences] = useState({
        essential: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        const savedPreferences = getCookie("cookiePreferences");
        if (savedPreferences) {
            setPreferences(JSON.parse(savedPreferences));
        }
    }, []);

    const handleSavePreferences = () => {
        document.cookie = `cookiePreferences=${JSON.stringify(preferences)}; path=/; max-age=${60 * 60 * 24 * 365}`;
        setIsOpen(false);
        window.location.reload();
    };

    const handleAcceptAll = () => {
        setPreferences({ essential: true, analytics: true, marketing: true });
        document.cookie = `cookiePreferences=${JSON.stringify({
            essential: true,
            analytics: true,
            marketing: true,
        })}; path=/; max-age=${60 * 60 * 24 * 365}`;
        setIsOpen(false);
        //reload the page
        window.location.reload();
    };

    const handleRejectAll = () => {
        setPreferences({ essential: true, analytics: false, marketing: false });
        document.cookie = `cookiePreferences=${JSON.stringify({
            essential: true,
            analytics: false,
            marketing: false,
        })}; path=/; max-age=${60 * 60 * 24 * 365}`;
        setIsOpen(false);
        window.location.reload();
    };

    function getCookie(name) {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            let [key, value] = cookie.split("=");
            if (key === name) return value;
        }
        return null;
    }

    if (!isOpen) return null; // Don't render if modal is closed

    return (
        <div className={styles.cookieOverlay}>
            <div className={styles.cookieContainer}>
                <h2 className={styles.cookieTitle}>Gestione Cookie</h2>
                <p className={styles.cookieDescription}>
                    Utilizziamo i cookie per migliorare l'esperienza utente. Puoi gestire le tue preferenze qui.
                </p>

                <div className={styles.cookieOptions}>
                    <label className={styles.cookieLabel}>
                        <input type="checkbox" checked disabled />
                        Cookie Essenziali (Obbligatori)
                    </label>
                    <label className={styles.cookieLabel}>
                        <input
                            type="checkbox"
                            checked={preferences.analytics}
                            onChange={(e) =>
                                setPreferences({ ...preferences, analytics: e.target.checked })
                            }
                        />
                        Cookie Analitici
                    </label>
                    <label className={styles.cookieLabel}>
                        <input
                            type="checkbox"
                            checked={preferences.marketing}
                            onChange={(e) =>
                                setPreferences({ ...preferences, marketing: e.target.checked })
                            }
                        />
                        Cookie di Marketing
                    </label>
                </div>

                <div className={styles.cookieButtons}>
                    <button className={styles.acceptButton} onClick={handleAcceptAll}>
                        Accetta Tutti
                    </button>
                    <button className={styles.rejectButton} onClick={handleRejectAll}>
                        Rifiuta Tutti
                    </button>
                    <button className={styles.saveButton} onClick={handleSavePreferences}>
                        Salva Preferenze
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Component;
