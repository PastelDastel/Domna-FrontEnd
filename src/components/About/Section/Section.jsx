import style from "./Section.module.css";
import { Link } from "react-router-dom";

const Section = ({
  title,
  content1,
  content2,
  linkText,
  link,
  imageUrl,
  reverse,
  top,
  left,
  imgW = 640,
  imgH = 400,
}) => {
  return (
    <div style={{ width: `${imgW}px`, height: `${imgH}px` }}
    className={`${style.container} ${reverse ? style.reverse : ""}`}>
      <div
        className={style.imageSection}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div
        className={style.textSection}
        style={{ top: `${top}px`, left: `${left}px` }}
      >
        <h2>
          <b>{title}</b>
        </h2>
        <hr />
        <p className={style.paragraph}>{content1}</p>
        <p className={style.paragraph}>{content2}</p>
        {link && (
          <>
            <hr />
            <div className={style.button}>
              <Link to={link} className={style.navLink}>
                {linkText}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Section;
