import React, { useState, useRef, useEffect } from "react";
import styles from "./CourseArticle.module.css";

const ProductComponent = ({ name, price, discountedPrice, featuresList, deniedList = [], whatToExpectHTML, period }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
      contentRef.current.style.opacity = "1";
    } else {
      contentRef.current.style.height = "0";
      contentRef.current.style.opacity = "0";
    }
  }, [isDropdownOpen]);

  return (
    <div className={styles.container}>
      <hr className={styles.fullHr} />
      <div className={styles.productInfo}>
        <h2 className={styles.heading}>{name} - Formula {period}</h2>
        <div className={styles.price}>
          {discountedPrice ? (
            <>
              <span className={styles.discountedPrice}>${discountedPrice}</span>
              <span className={styles.originalPrice}>${price}</span>
            </>
          ) : (
            <span>${price}</span>
          )}
        </div>
        <div className={styles.quantitySection}>
          <label className={styles.quantityLabel} htmlFor="quantity">
            Quantità:
          </label>
          <input
            type="number"
            id="quantity"
            className={styles.quantityInput}
            min="1"
            defaultValue="1"
          />
        </div>
        <button className={styles.addToCartBtn}>AGGIUNGI AL CARRELLO</button>
      </div>

      <ul className={styles.featuresList}>
        {featuresList.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
        {deniedList.map((deniedFeature, index) => (
          <li key={`denied-${index}`} className={styles.strikethrough}>
            {deniedFeature}
          </li>
        ))}
      </ul>

      <hr className={styles.fullHr} />
      <div className={styles.sectionTitle} onClick={toggleDropdown}>
        Cosa Aspettarsi da Questo Corso{" "}
        <span className={styles.sectionTitleIcon}>
          {isDropdownOpen ? "−" : "+"}
        </span>
      </div>

      <div
        ref={contentRef}
        className={styles.dropdownContent}
        style={{ overflow: "hidden", transition: "height 0.4s ease-in-out, opacity 0.4s ease-in-out", height: "0", opacity: "0" }}
        dangerouslySetInnerHTML={{ __html: whatToExpectHTML }}
      ></div>
    </div>
  );
};

export default ProductComponent;
