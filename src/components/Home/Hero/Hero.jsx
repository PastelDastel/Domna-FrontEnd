import LetterAnimation from "../Letter Animation/LetterAnimation";
import "./Hero.css";
/*
  hero
   hero-text
   animated-text
  
  social-icons

  bounce-arrow
    #bounceArr
*/

const Hero = ({ text, animatedText, textAlignment }) => {

  return (

    <div className="hero">
      <div className="hero-text">
        <h1>{text}</h1>
          <LetterAnimation text={animatedText} />
      </div>
      <div className="social-icons">
        <a href="https://www.facebook.com/domnaallenamentofunzionalefemminile">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com/domna_allenamentofemminile/">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" target="_blank"><i className="fab fa-tiktok"></i></a>
        </div>
        <div className="bounce-arrow">
        <a href="#prima-sezione">
          <i className="fas fa-chevron-down" id="bounceArr" style={{color: 'pink'}}></i>
        </a>
      </div>
    </div>
  );
};

export default Hero;
