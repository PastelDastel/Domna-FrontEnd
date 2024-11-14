import { Link } from "react-router-dom";
import style from "./Section.module.css";
import { motion } from "framer-motion";
const animationVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const Section = () => {
  return (
    <>
      <motion.div initial="hidden" whileInView="visible" variants={animationVariants}>

        <div className={style.container}>
          {/* Image Section */}
          <div
            className={style.imageSectionFirst}
          ></div>

          {/* Text Section */}
          <div
            className={`${style.textSection} ${style.first}`}
          >
            <h2><b>Metodo DOMNA</b></h2>
            <hr />
            <p className={style.paragraphSectionFirst}>
              Il metodo Domna è un percorso dedicato alle donne che desiderano
              riscoprire la propria armonia.
            </p>
            <p className={style.paragraphSectionFirst}>
              Domna è un percorso dedicato alle donne che supporta il cambiamento e
              la trasformazione attraverso livelli di allenamento.
            </p>
            <hr />
            <div className={style.button}>
              <Link to="/courses" className={style.navlink}>Scopri di più</Link>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" variants={animationVariants}>

        <div className={style.container}>
          {/* Image Section */}
          <div
            className={style.imageSectionSecond}
          ></div>

          {/* Text Section */}
          <div
            className={`${style.textSection} ${style.second}`}
          >
            <h2><b>Obiettivi DOMNA</b></h2>
            <hr />
            <p className={style.paragraphSectionSecond}>
              Domna propone un nuovo punto di vista per la trasformazione del corpo e
              la riscoperta della bellezza autentica.
            </p>
            <p className={style.paragraphSectionSecond}>
              Dimentica gli allenamenti e immagina una piacevole educazione al
              movimento.
            </p>
            <hr />
            <div className={style.button}>
              <Link to="/about" className={style.navlink}>Scopri di più</Link>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" variants={animationVariants}>

        <div className={style.container}>
          {/* Image Section */}
          <div
            className={style.imageSectionThird}
          ></div>

          {/* Text Section */}
          <div
            className={`${style.textSection} ${style.third}`}
          >
            <h2><b>Sei indecisa? Scopri il percorso adatto a te!</b></h2>
            <hr />
            <p className={style.paragraphSectionThird}>
              DOMNA ti guida in ogni passo. Rispondi al nostro quiz per trovare il
              percorso perfetto per le tue esigenze e obiettivi.
            </p>

            <hr />
            <div className={style.button}>
              <Link to="/about" className={style.navlink}>Scopri di più</Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Section;
