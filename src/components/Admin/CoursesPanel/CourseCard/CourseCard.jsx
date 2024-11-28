import style from "./CourseCard.module.css";

const CourseCard = ({ course, onView, onEdit, onDelete }) => {
    console.log(course);
    return (
        <div className={style.card} onClick={onView}>
            <h3 className={style.title}>{course.title}</h3>
            <p className={style.subtitle}>Instructor: {course.instructor}</p>
            <p className={style.subtitle}>Price: {course.price}</p>
            <p className={style.subtitle}>
                Created at: {new Date(course.CreatedAt).toLocaleDateString()}
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

export default CourseCard;