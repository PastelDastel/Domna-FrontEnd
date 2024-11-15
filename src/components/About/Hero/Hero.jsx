import style from "./Hero.module.css";
const Hero = ({ text }) => {

    return (

        <div className={style.hero}>
            <div className={style.heroText}>
                <h1>{text}</h1>
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