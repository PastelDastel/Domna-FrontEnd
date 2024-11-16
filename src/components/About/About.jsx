import React, { Suspense } from "react";
import style from "./About.module.css";
import FirstSection from "./FirstSection/FirstSection";
import SecondSection from "./SecondSection/SecondSection";
import ThirdSection from "./ThirdSection/ThirdSection";
import Accordion from "./Accordion/Accordion";
const About = () => {
  return (
    <div className={style.pageContainer}>
      <Suspense fallback={<div>Loading...</div>}>
        <Hero text={"Conosci Marcella"} />
      </Suspense>
      <div className={style.separatorHrFromHero}></div>
      <Suspense fallback={<div>Loading...</div>}>
        <FirstSection />
        <div className={style.separatorHr}>
          <hr className={style.separatorMind} />
        </div>
        <SecondSection />
        <div className={style.separatorHrSecond}>
          <hr className={style.separatorMindSecond} />
        </div>
        <ThirdSection />
        <Accordion items={["Allah", "Jesus"]}/>
      </div>
    </>
  );
};

export default About;
