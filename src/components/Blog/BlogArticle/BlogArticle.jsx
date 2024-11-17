import style from "./BlogArticle.module.css";
import { Link } from "react-router-dom";

const BlogArticle = ({ img, title, description, className }) => {
    console.log("Rendered className:", `${style.blogPost} ${className || ''}`);

    return (
        <div className={`${style.blogPost} ${className || ''}`}>
            <img src={img} alt={`${title} Immagine`} />
            <div className={style.blogContent}>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link to={`/blog/article/${title}`} className={style.readMore}>
                    Leggi di più
                </Link>
            </div>
        </div>
    );
};

export default BlogArticle;
