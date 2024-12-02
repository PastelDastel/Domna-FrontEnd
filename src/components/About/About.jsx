import style from "./About.module.css";
import FirstSection from "./FirstSection/FirstSection";
import SecondSection from "./SecondSection/SecondSection";
import ThirdSection from "./ThirdSection/ThirdSection";
import Accordion from "./Accordion/Accordion";
import Hero from "./Hero/Hero";
import Parallax from "./Parallax/Parallax";
import ArticleCard from "./ArticleCard/ArticleCard";
import ContactParallax from "./ContactParallax/ContactParallax";
import blog1 from "../../assets/JPG/blog1.jpg";
import blog2 from "../../assets/JPG/blog2.jpg";
import blog3 from "../../assets/JPG/blog3.jpeg";
const About = () => {
  return (
    <div className={style.pageContainer}>
      <Hero text={"Conosci Marcella"} />
      <div className={style.separatorHrFromHero}></div>
      <FirstSection />
      <div className={style.separatorHr}>
        <hr className={style.separatorMind} />
      </div>
      <SecondSection />
      <div className={style.separatorHrSecond}>
        <hr className={style.separatorMindSecond} />
      </div>
      <ThirdSection />
      <div className={style.separatorHrThird}>
        <hr className={style.separatorMindThird} />
      </div>

      <Accordion />
      <div className={style.separatorHrFourth}>
        <hr className={style.separatorMindFourth} />
      </div>
      <Parallax />
      <div className={style.articleWrapper}>
        <ArticleCard image={blog1} overlay={"ALLENAMENTO FUNZIONALE"} title={"Allenamento Femminile"} text={`                <b>Allenamento Funzionale Femminile</b><br>
                L’allenamento funzionale femminile aiuta il corpo a riscoprire movimenti complessi e stimola coordinazione, torsione, e mobilità. Per le donne, è essenziale combinare ipertrofia e tonificazione con mobilità articolare e stimoli miofasciali. Un buon programma inizia con la forza e la mobilità di base (PERCORSO STARTER) e prosegue con percorsi personalizzati avanzati. L’allenamento rispetta le differenze di genere, garantendo risultati e salute.
`} />
        <ArticleCard image={blog2} overlay={"BENEFICI DELLO SPORT"} title={"Tocco Personale"} text={`                <b>Benefici dello Sport per le Donne</b><br>
                Lo sport migliora l’umore grazie all’endorfina, gestisce lo stress, e supporta un sonno migliore. È anche utile per affrontare disturbi alimentari e sbalzi ormonali. Fare esercizio protegge la salute cardiovascolare, mantenendo colesterolo e pressione sotto controllo. Bastano 20 minuti al giorno per iniziare a ottenere benefici per la salute e il benessere generale.
`} />
        <ArticleCard image={blog3} overlay={"COACHING ONLINE"} title={"Per la tua comodità"} text={`                <b>Caratteristiche dell'Allenamento Funzionale Femminile</b><br>
                L’allenamento funzionale femminile considera le esigenze uniche delle donne, come metabolismo e ormoni, creando percorsi personalizzati. Questo tipo di allenamento punta a migliorare equilibrio fisiologico, forma fisica, energia, salute e autostima, con un approccio scientifico che offre risultati duraturi e benessere.
`} />
      </div>
      <div className={style.articleWrapper}>
        <ArticleCard image={blog1} overlay={"ALLENAMENTO FUNZIONALE"} title={"Allenamento Femminile"} text={`                <b>Allenamento Funzionale Femminile</b><br>
                L’allenamento funzionale femminile aiuta il corpo a riscoprire movimenti complessi e stimola coordinazione, torsione, e mobilità. Per le donne, è essenziale combinare ipertrofia e tonificazione con mobilità articolare e stimoli miofasciali. Un buon programma inizia con la forza e la mobilità di base (PERCORSO STARTER) e prosegue con percorsi personalizzati avanzati. L’allenamento rispetta le differenze di genere, garantendo risultati e salute.
`} />
        <ArticleCard image={blog2} overlay={"BENEFICI DELLO SPORT"} title={"Tocco Personale"} text={`                <b>Benefici dello Sport per le Donne</b><br>
                Lo sport migliora l’umore grazie all’endorfina, gestisce lo stress, e supporta un sonno migliore. È anche utile per affrontare disturbi alimentari e sbalzi ormonali. Fare esercizio protegge la salute cardiovascolare, mantenendo colesterolo e pressione sotto controllo. Bastano 20 minuti al giorno per iniziare a ottenere benefici per la salute e il benessere generale.
`} />
        <ArticleCard image={blog3} overlay={"COACHING ONLINE"} title={"Per la tua comodità"} text={`                <b>Caratteristiche dell'Allenamento Funzionale Femminile</b><br>
                L’allenamento funzionale femminile considera le esigenze uniche delle donne, come metabolismo e ormoni, creando percorsi personalizzati. Questo tipo di allenamento punta a migliorare equilibrio fisiologico, forma fisica, energia, salute e autostima, con un approccio scientifico che offre risultati duraturi e benessere.
`} />
      </div>
      <ContactParallax />
    </div>
  );
};

export default About;
