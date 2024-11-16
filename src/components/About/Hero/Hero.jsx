import React, { memo } from "react";
import style from "./Hero.module.css";
import image from "../../../assets/JPG/IMG_7942.jpg";
const Hero = ({ text }) => {
    return (
        <div className={style.hero}>
            <div className={style.heroText}>
                <h1>{text}</h1>
            </div>
            <div className={style.bounceArrow}>
                <a href="#first">
                    <i className="fas fa-chevron-down" id="bounceArr"></i>
                </a>
            </div>
        </div>
    );
};

export default memo(Hero);
