import { useEffect } from "react";
import styles from "./ParallaxFooter.module.css";

const ParallaxSection = ({ imageUrl, text, id, startOffset = 0, mailto }) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const parallaxElement = document.getElementById(id);

      if (parallaxElement && scrollPosition > startOffset) {
        parallaxElement.style.backgroundPositionY = `-${
          (scrollPosition - startOffset) * 0.3
        }px`;
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
        margin: "0",
      }}
    >
      <div className={styles.contactContent}>
        {" "}
        <p className={styles.reviewTestimonialText}>{text}</p>
        <a href="mailto:info@domna.net" className={styles.contactButton}>
          {mailto}
        </a>
      </div>
    </div>
  );
};

export default ParallaxSection;
