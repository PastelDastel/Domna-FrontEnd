import style from "./SecondSection.module.css";
import { Link } from "react-router-dom";
const SecondSection = () => {
    return (<>
        <div className={style.separatorMindset}>
            <div className={style.mindsetContainer}>
                <div className={style.mindsetColumn}>
                    <h2>VECCHIA MENTALITÀ</h2>
                    <p className={style.mindsetText}>
                        Ho seguito gli estremi del fitness. Sono stata schiava della palestra. Avevo l'8% di massa grassa.
                        Ho limitato i carboidrati e le calorie. Dall'esterno sembravo "sana" e venivo elogiata per la mia
                        disciplina. Ora posso dirvi che ciò che sembra sano dall'esterno non è sempre sano dall'interno.
                    </p>
                    <p className={style.mindsetText}>
                        Il mio corpo era malato. Ero infertile, senza libido, sempre fredda, ansiosa, con i capelli che si
                        assottigliavano, mancanza di spazio mentale ed energia per cose diverse dal cibo e dall'esercizio
                        fisico, e mai soddisfatta del mio corpo: non era mai abbastanza.
                    </p>
                </div>
                <div className={style.mindsetColumn}>
                    <h2>NUOVA MENTALITÀ</h2>
                    <p className={style.mindsetText}>
                        Ora so che la salute è molto più del numero sulla bilancia o della percentuale di massa grassa.
                        Credo che si possa fare qualcosa per se stessi ogni singolo giorno, perseguendo la salute senza
                        esaurirsi (e senza scombussolare i propri ormoni nel processo). La vera salute considera la salute
                        mentale, insieme alla salute fisica, e può essere mantenuta in tutte le stagioni e fasi della vita.
                    </p>
                </div>
            </div>
        </div>
    </>)
}

export default SecondSection;