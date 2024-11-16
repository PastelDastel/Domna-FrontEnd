import React, { Suspense } from "react";
import style from "./About.module.css";

const Hero = React.lazy(() => import("./Hero/Hero"));
const FirstSection = React.lazy(() => import("./FirstSection/FirstSection"));
const SecondSection = React.lazy(() => import("./SecondSection/SecondSection"));

const About = () => {
  return (
    <div className={style.pageContainer}>
      <Suspense fallback={<div>Loading...</div>}>
        <Hero text={"Conosci Marcella"} />
      </Suspense>
      <div className={style.separatorHrFromHero}></div>
      <Suspense fallback={<div>Loading...</div>}>
        <FirstSection />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <SecondSection />
      </Suspense>

    </div>
  );
};

export default About;
