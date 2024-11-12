import { useEffect } from "react";
import styles from "./ParallaxSection.module.css";

const ParallaxSection = ({ imageUrl, text, id, startOffset = 0 }) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const parallaxElement = document.getElementById(id);

      if (parallaxElement && scrollPosition > startOffset) {
        parallaxElement.style.backgroundPositionY = `-${(scrollPosition - startOffset) * 0.3}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id, startOffset]);

  return (
    <div
      className={styles.parallaxSection1MarginFiller}
      id={id}
      style={{
        backgroundImage: `url("${imageUrl}")`,
        margin: "0"
      }}
    >
      <p className={styles.reviewTestimonialText}>{text}</p>
    </div>
  );
  
};

export default ParallaxSection;
