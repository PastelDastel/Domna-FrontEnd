import styles from "../style/Courses.module.css";
import CoursesWrapper from "./Courses Page Components/CoursesWrapper/CoursesWrapper";
const Courses = () => {
  return (
    <div className={styles.coursesContainer}>
      <CoursesWrapper />
    </div>
  );
};

export default Courses;
