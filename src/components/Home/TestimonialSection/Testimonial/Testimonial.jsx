import React from "react";
import style from "./Testimonial.module.css";

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
    <div className={style.testimonial}>
      <img src={image} alt={`${name}'s profile`} />
      <h3 className={style.testimonialName}>{name}</h3>
      <p className={style.testimonialRole}>{role}</p>
      <p className={style.testimonialText}>{text}</p>
      <div className={style.stars}>{stars}</div>
    </div>
  );
};

export default Testimonial;
