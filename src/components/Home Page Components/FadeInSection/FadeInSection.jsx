import { useRef, useState, useEffect } from "react";
import styles from "./FadeInSection.module.css";

const FadeInSection = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const top = sectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 100) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`${styles.fadeInSection} ${isVisible ? styles.fadeInVisible : ""}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
