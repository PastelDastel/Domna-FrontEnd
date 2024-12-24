import LetterAnimation from "../../Global Components/Letter Animation/LetterAnimation";
import style from "./Hero.module.css";
import { Link } from "react-router-dom";
const Hero = ({ text, animatedText }) => {

  return (

    <div className={style.hero}>
      <div className={style.heroText}>
        <h1>{text}</h1>
        <LetterAnimation text={animatedText} />
        <div className={style.ButtonCorsi}>
          <Link to="/courses" className={style.navToCourses}>
            Allenati ora</Link>
        </div>
      </div>
      <div className={style.socialIcons}>
        <a href="https://www.facebook.com/domnaallenamentofunzionalefemminile">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com/domna_allenamentofemminile/">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" target="_blank"><i className="fab fa-tiktok"></i></a>
      </div>
      <div className={style.bounceArrow}>
        <a href="#first" >
          <i className="fas fa-chevron-down" id="bounceArr"></i>
        </a>
      </div>
    </div>
  );
};

export default Hero;