/* eslint-disable react/prop-types */
import styles from "./Hero.module.css";
import { useEffect } from "react";
import LetterAnimation from "../Letter Animation/LetterAnimation";

const Hero = ({ text, animatedText, textAlignment }) => {
  console.log(text, animatedText);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      document.getElementById("heroS").style.backgroundPositionY = `-${
        scrollPosition * 0.3
      }px`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={styles.hero} id="heroS">
      <div
        className={
          textAlignment === "left"
            ? styles.heroTextLeft
            : textAlignment === "center"
            ? styles.heroTextCenter
            : styles.heroTextRight // Assume "right" is the fallback alignment if needed
        }
      >
        <h1>{text}</h1>
        <LetterAnimation text={animatedText} />
      </div>
      <div className={styles.socialIcons}>
        <a href="https://www.facebook.com/domnaallenamentofunzionalefemminile">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com/domna_allenamentofemminile/">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.tiktok.com/@frutteromarcella.domna">
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
