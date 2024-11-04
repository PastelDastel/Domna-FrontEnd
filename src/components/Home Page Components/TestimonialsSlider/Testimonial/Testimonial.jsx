import React from "react";
import styles from "./Testimonial.module.css";

const Testimonial = ({ image, name, role, text, rating }) => {
  // Generate stars based on the rating prop (full and half stars)
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    } else if (i - rating === 0.5) {
      stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
    } else {
      stars.push(<i key={i} className="far fa-star"></i>);
    }
  }

  return (
    <div className={styles.testimonial}>
      <img className={styles.image} src={image} alt={`${name}'s profile`} />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.role}>{role}</p>
      <p className={styles.text}>{text}</p>
      <div className={styles.stars}>{stars}</div>
    </div>
  );
};

export default Testimonial;
