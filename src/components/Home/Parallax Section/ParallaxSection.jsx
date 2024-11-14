import style from "./ParallaxSection.module.css";
const ParallaxSection = ({ imageUrl, text, id, startOffset = 0 }) => {
  return (
    <div
      id={id}
      className={style.parallaxSection1MarginFiller}
    >
      <p className={style.reviewTestimonialText}>
        {text}
      </p>
    </div>
  );
};

export default ParallaxSection;
