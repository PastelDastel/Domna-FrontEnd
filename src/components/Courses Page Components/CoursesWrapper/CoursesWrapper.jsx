import styles from "./CoursesWrapper.module.css";
import Course from "./Course/Course";
const CoursesWrapper = () => {
  return (
    <div className={styles.coursesWrapper}>
      <Course
        image="https://placehold.co/400x400/"
        price="$39"
        time_range="Mensile"
        benefits={["Preparazione", "Pancia piatta", "Tonifica"]}
        excluded_benefits={["AntiCellulite", "Live", "Video decontrazione"]}
      />
      <Course
        image="https://placehold.co/400x400/"
        price="$235"
        new_price="$227"
        time_range="Semestrale"
        benefits={["Preparazione", "Pancia piatta", "Tonifica"]}
        excluded_benefits={["AntiCellulite", "Live", "Video decontrazione"]}
      />
      <Course
        image="https://placehold.co/400x400/"
        price="$470"
        new_price="$435"
        time_range="Annuale"
        benefits={["Preparazione", "Pancia piatta", "Tonifica"]}
        excluded_benefits={["AntiCellulite", "Live", "Video decontrazione"]}
      />
      
    </div>
  );
};

export default CoursesWrapper;
