import style from './BlogArticle.module.css';
import { Link } from 'react-router-dom';
const BlogArticle = ({ article }) => {
  return (
    <div className={style.card}>
        <div className={style.cardImage} style={{backgroundImage:`url(${article.imgURL})`}}>
            <div className={style.cardOverlay}>{article.overlayText}</div>
        </div>
        <h3 className={style.cardTitle}>{article.title}</h3>
        <p className={style.cardText}>
            <b>{article.subtitle}</b><br />
            {article.content}
        </p>
            <Link to={article.href} className={style.learnMore}>Scopri di più</Link>

    </div>
  );
};
export default BlogArticle;
