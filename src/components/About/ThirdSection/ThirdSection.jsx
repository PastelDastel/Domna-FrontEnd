import style from "./ThirdSection.module.css";

const ThirdSection = () => {
    return (<>
        <div className={style.container}>
            <div className={style.imageSection}></div>
            <div className={style.textSection}>
                <h2><b>La Mia Specialità</b></h2>
                <p className={style.paragraphSectionPresentation}>                <strong>Sono felice di lavorare con te!</strong>
                </p>
                <p className={style.paragraphSection}>                L’impegno è stato tanto e la mia <strong>formazione professionale</strong> è continua. Un esempio? Per garantire la <strong>massima competenza</strong> sia in termini di <strong>educazione al movimento</strong> sia in competenza in ambito <strong>nutrizionale</strong>, ho conseguito il diploma di <strong>Nutraceutica Sport Consultant</strong> presso <strong>CNM Italia</strong>, che conferisce il diploma rilasciato da <strong>CNM UK – The College of Naturopathic Medicine UK</strong>, oltre alle certificazioni in <strong>Woman Functional Training</strong> e <strong>Primitive Movement</strong> presso la <strong>WTA Academy</strong>.
                </p>
                <p className={style.paragraphSection}>                Ma sono soprattutto una donna <strong>grata</strong>, perché tante, tantissime donne mi hanno permesso di entrare nella loro vita, di <strong>condividerne gli obiettivi</strong>, di <strong>dar animo ai desideri</strong>, di offrire <strong>spazio ai sogni</strong>, di gioire degli <strong>incredibili risultati</strong>. Essere in contatto con le donne in <strong>trasformazione</strong>, metterne in luce la <strong>forza creativa</strong>, prendere parte alla loro <strong>rinascita</strong>, per me è <strong>pura gioia</strong>.
                </p>
            </div>
        </div>
    </>)
};

export default ThirdSection;