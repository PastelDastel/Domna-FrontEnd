import style from "./FirstSection.module.css";
const FirstSection = () => {
    return (<>
        <div className={style.container} id="first">
            <div className={style.imageSection}></div>
            <div className={style.textSection}>
                <h2><b>La Mia Storia</b></h2>
                <p className={style.paragraphSectionPresentation}>
                    Sono contento tu sia qui!
                </p>
                <p className={style.paragraphSection}>
                    La mia storia è una <strong>continua esplorazione</strong>. Fin da giovane, ho sentito la necessità di comprendere meglio il
                    mondo che mi circondava e, soprattutto, di esplorare le <strong>mie capacità</strong>, i <strong>miei limiti</strong>, e le possibilità che
                    la vita mi offriva. La <strong>naturopatia</strong> è stata il mio primo amore, un percorso che mi ha insegnato a <strong>osservare</strong>
                    e ad <strong>ascoltare</strong> la natura, ma soprattutto a comprendere i <strong>messaggi</strong> che il nostro <strong>corpo</strong> e la nostra <strong>mente</strong> ci
                    inviano ogni giorno. Da lì, ho capito quanto fosse importante mantenere un <strong>equilibrio</strong>, rispettare il proprio
                    <strong>ritmo</strong> e coltivare il <strong>benessere</strong> come uno <strong>stile di vita</strong>, non come un obiettivo lontano e difficile da raggiungere.
                </p>
                <p className={style.paragraphSection}>
                    Con il passare degli anni, ho unito la passione per la <strong>naturopatia</strong> a quella per il <strong>movimento</strong>. Per me, il
                    corpo è uno <strong>strumento straordinario</strong>, un veicolo che ci permette di <strong>esprimerci</strong>, di <strong>crescere</strong> e di <strong>scoprire</strong>
                    chi siamo davvero. Ho sempre creduto che il <strong>movimento</strong> non fosse solo una questione fisica, ma anche <strong>mentale</strong>
                    e <strong>spirituale</strong>.
                </p>
            </div>
        </div>
    </>)
}

export default FirstSection;