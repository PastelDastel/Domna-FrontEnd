import { Parallax } from "react-scroll-parallax";
import "./Hero.css";

const Hero = ({ y1, y2, background }: { y1: number; y2: number , background : string}) => {
  return (
    <Parallax translateY={[y1, y2]} className="hero" style={{ backgroundImage: `url(${background})` }}>
      <div className="hero-content">
        <h1 className="hero-title">DOMNA</h1>
        <p className="hero-subtitle">Allenamento funzionale femminile.</p>
      </div>
    </Parallax>
  );
};

export default Hero;
