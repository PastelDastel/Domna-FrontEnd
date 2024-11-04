import React, { useEffect } from "react";
import styles from "./LetterAnimation.module.css";

const LetterAnimation = ({ text }) => {
  useEffect(() => {
    const spans = document.querySelectorAll(`.${styles.letter}`);
    spans.forEach((span, index) => {
      setTimeout(() => {
        span.style.opacity = "1";
        span.style.transform = "translateX(0)";
      }, 35 * index); // adjust timing for letter-by-letter effect
    });
  }, [text]);

  return (
    <p className={styles.letterContainer}>
      {text.split("").map((letter, index) => (
        <span key={index} className={styles.letter}>
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </p>
  );
};

export default LetterAnimation;
