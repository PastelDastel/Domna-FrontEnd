import style from "./ArticleCard.module.css";
import { Link } from "react-router-dom";

const ArticleCard = ({ title, text, overlay, image }) => {
    return (
        <div className={style.card}>
            <div className={style.cardImage} style={{ backgroundImage: `url("${image}")` }}>
                <div className={style.cardOverlay}>{overlay}</div>
            </div>
            <h3 className={style.cardTitle}>{title}</h3>
            <p
                className={style.cardText}
                dangerouslySetInnerHTML={{ __html: text }} // Allows HTML content
            ></p>
            <button className={style.learnMore}>
                <Link to="/courses" className={style.navLink}>Il Blog sara' disponibile a breve</Link>
            </button>
        </div>
    );
};

export default ArticleCard;
