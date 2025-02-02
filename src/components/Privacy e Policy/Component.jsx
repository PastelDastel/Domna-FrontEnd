import style from "./Component.module.css";

const Policy = () => {
    return (
        <div className={style.container}>
            <h1>Cookie e Privacy Policy DOMNA</h1>
            <section className={style.policySection}>
                <h2>Cookie Policy</h2>
                <p>
                    Utilizziamo cookie per migliorare l’esperienza utente. I cookie possono essere:
                    <ul>
                        <li><strong>Essenziali:</strong> Necessari per il funzionamento del sito.</li>
                        <li><strong>Analitici:</strong> Per monitorare le prestazioni del sito.</li>
                        <li><strong>Di terze parti:</strong> Per l’integrazione con strumenti esterni.</li>
                    </ul>
                    Puoi gestire le preferenze cookie dalle impostazioni del tuo browser.
                </p>
            </section>
            <section className={style.policySection}>
                <h2>Privacy Policy</h2>
                <p>
                    La tua privacy è importante per noi. I dati raccolti vengono utilizzati solo per:
                    <ul>
                        <li>Gestire il tuo account e i tuoi acquisti.</li>
                        <li>Fornire supporto tecnico e migliorare i nostri servizi.</li>
                        <li>Inviare comunicazioni promozionali (solo se hai dato il consenso).</li>
                    </ul>
                    Per richiedere la cancellazione dei tuoi dati, contatta <a href="mailto:support@domna.net">support@domna.net</a>.
                </p>
            </section>
        </div>
    );
};

export default Policy;
