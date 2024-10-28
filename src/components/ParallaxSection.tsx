import { Parallax } from "react-scroll-parallax";
import "./ParallaxSection.css"; // Create this file for custom styles

const ParallaxSection = ({
  text,
  background,
  coords,
}: {
  text: string;
  background: string;
  coords: [number, number];
}) => {
  return (
    <Parallax
      className="parallax-section"
      translateY={coords}
      
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="parallax-content">
        <p className="parallax-text">{text}</p>
      </div>
    </Parallax>
  );
};

export default ParallaxSection;
