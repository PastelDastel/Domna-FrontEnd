import { Parallax } from "react-scroll-parallax";
import "./FirstSection.css";

const FirstSection = ({
  background,
  coords,
}: {
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
        <p className="parallax-text">
            DOMNA
        </p>
        <button className="parallax-button">
            Allenati ora
        </button>
        <button className="parallax-button">Online coaching</button>
      </div>
    </Parallax>
  );
};

export default FirstSection;
