import Hero from "./Hero/Hero";
import style from "./About.module.css";
import FirstSection from "./FirstSection/FirstSection";
import SecondSection from "./SecondSection/SecondSection";
const About = () => {
  return (
    <>
      <div className={style.pageContainer}>
        <Hero text={"Conosci Marcella"} />
        <div className={style.separatorHrFromHero}></div>
        <FirstSection />
        <div className={style.separatorHr}>
          <hr className={style.separatorMind} />
        </div>
       { <SecondSection /> }
        <div className={style.separatorHrSecond}>
          <hr className={style.separatorMindSecond} />
        </div>
      </div>
    </>
  );
};

export default About;
