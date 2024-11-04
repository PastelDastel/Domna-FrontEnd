import styles from "./Course.module.css";
import { Link } from "react-router-dom";
const Course = ({
  benefits,
  excluded_benefits,
  price,
  time_range,
  image,
  new_price,
}) => {
  return (
    <>
      <li className={styles.pricingTableItem}>
        <img
          src={image}
          alt="Course Image"
          className={styles.pricingTableImg}
        />
        <h3 className={styles.pricingTableTitle}>{time_range}</h3>
        <p className={styles.pricingTableDescription}>
          {new_price ? (
            <>
              <span className={styles.pricingTablePrice}>
                <stike>{price}</stike> {new_price}
              </span>
            </>
          ) : (
            <>
              <span className={styles.pricingTablePrice}>{price}</span>
            </>
          )}
          <span className={styles.pricingTableLabel}>Iva inclusa</span>
        </p>
        <ul className={styles.pricingTableProducts}>
          {benefits.map((benefit, index) => {
            return (
              <li key={index} className={styles.pricingTableProductIncluded}>
                {benefit}
              </li>
            );
          })}
          {excluded_benefits.map((excluded_benefit, index) => {
            return (
              <li key={index} className={styles.pricingTableProductExcluded}>
                <stike>{excluded_benefit}</stike>
              </li>
            );
          })}
        </ul>
        <Link to="/buy/:id" className={styles.pricingTableButton}>
          Acquista Ora!
        </Link>
      </li>
    </>
  );
};

export default Course;
