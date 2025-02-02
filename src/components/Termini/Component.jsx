import style from "./Style.module.css";

const Policy = () => {
    return (
        <div className={style.container}>
            <h1>Termini e condizioni DOMNA</h1>

            {/* Politica di Reso */}
            <section className={style.policySection}>
                <h2>Politica di Reso</h2>
                <p>
                    <strong>1. Domna</strong><br />
                    Una volta acquistato un corso registrato su Domna.net, non sarà possibile richiedere un rimborso, in quanto il contenuto è accessibile immediatamente dopo l'acquisto.
                    <br /><strong>Eccezioni:</strong> Se riscontri problemi tecnici che impediscono l'accesso al corso e non riusciamo a risolverli entro 48 ore dalla tua segnalazione, potrai richiedere un rimborso completo.
                </p>

                <p>
                    <strong>2. Domna Live - Domna Live Plus</strong><br />
                    Puoi richiedere un rimborso completo per i corsi live fino a 48 ore prima dell'inizio della sessione. Dopo questo periodo, i pagamenti non sono rimborsabili.
                    <br /><strong>Eccezioni:</strong> Se il corso live viene cancellato da noi, potrai ottenere un rimborso completo o riprogrammare la sessione.
                </p>

                <p>
                    <strong>3. Abbonamenti Mensili o Pacchetti di Corsi</strong><br />
                    Se hai sottoscritto un abbonamento o acquistato un pacchetto, puoi richiedere il rimborso del primo mese/corso non ancora avviato, entro 7 giorni dall'acquisto. Dopo l’utilizzo, i pagamenti non sono rimborsabili.
                    <br /><strong>Eccezioni:</strong> Per problemi tecnici o organizzativi da parte nostra, verrà emesso un rimborso pro-rata.
                </p>

                <p>
                    <strong>4. Processi e Tempi di Rimborso</strong><br />
                    Per richiedere un rimborso, invia un'email a <a href="mailto:support@domna.net">support@domna.net</a>.
                    Dopo un'attenta elaborazioni dei dati si potrebbe considerare un rimborso completo, parziale o nullo in base al livello di utilizzo delle risorse fornite da DOMNA.
                    In caso di rimborso completo o parziale i fondi verranno riaccreditati entro 7-10 giorni lavorativi.
                </p>
            </section>

            {/* Termini e Condizioni */}
            <section className={style.policySection}>
                <h2>Termini e Condizioni di Utilizzo</h2>
                <p>
                    L'accesso e l'utilizzo di Domna.net sono soggetti ai seguenti termini:
                    <ul>
                        <li>Gli utenti devono avere almeno 18 anni o il consenso di un tutore legale.</li>
                        <li>È vietato copiare, distribuire o rivendere i contenuti dei corsi.</li>
                        <li>Domna.net non è responsabile per problemi tecnici derivanti dall’utente.</li>
                        <li>Ci riserviamo il diritto di modificare le condizioni di utilizzo senza preavviso.</li>
                    </ul>
                </p>
            </section>
        </div>
    );
};

export default Policy;
