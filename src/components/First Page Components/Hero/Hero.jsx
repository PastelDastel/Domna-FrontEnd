import styles from "./Hero.module.css";
import { useEffect } from "react";
import LetterAnimation from "../LetterAnimation/LetterAnimation";
const Hero = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      document.getElementById("heroS").style.backgroundPositionY = `-${scrollPosition * 0.3}px`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={styles.hero} id="heroS">
      <div className={styles.heroText}>
        <h1>DOMNA</h1>
        <LetterAnimation text="Allenamento funzionale femminile."/>
      </div>
      <div className={styles.socialIcons}>
        <a href="https://www.facebook.com/domnaallenamentofunzionalefemminile">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com/domna_allenamentofemminile/">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#">
          <i className="fab fa-tiktok"></i>
        </a>
      </div>
      <div className={styles.bounceArrow}>
        <a href="#ParallaxFirstDivisor">
          <i className="fas fa-chevron-down" style={{ color: "#d75494" }}></i>
        </a>
      </div>
    </div>
  );
};

export default Hero;
