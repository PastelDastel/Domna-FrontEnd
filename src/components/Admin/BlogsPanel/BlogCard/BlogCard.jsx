import style from "./BlogCard.module.css";

const BlogCard = ({ blog, onView, onEdit, onDelete }) => {
    return (
        <div className={style.card} onClick={onView}>
            <h3 className={style.title}>{blog.title}</h3>
            <p className={style.subtitle}>Content: <span dangerouslySetInnerHTML={{ __html: blog.content }} /></p>
            <p className={style.subtitle}>Image: <img src={blog.image} alt={blog._id} /></p>
            <p className={style.subtitle}>
                Created at: {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <div className={style.buttonContainer}>
                <button
                    type="button"
                    className={style.modifyButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}
                >
                    Modify
                </button>
                <button
                    type="button"
                    className={style.deleteButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default BlogCard;