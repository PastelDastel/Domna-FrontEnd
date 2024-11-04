import React from 'react';
import styles from './CourseArticle.module.css';
import { useState } from 'react';

const ProductComponent = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    return (
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <h1 className={styles.heading}>Postpartum Training - 6-Month - Return to Fitness</h1>
          <div className={styles.price}>
            $240.00 <del className={styles.priceDel}>$450.00</del>
          </div>
          <label className={styles.quantityLabel} htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" className={styles.quantityInput} min="1" defaultValue="1" />
          <button className={styles.addToCartBtn}>Add to Cart</button>
        </div>
  
        <div className={styles.rightColumn}>
          <ul className={styles.featuresList}>
            <li>4 Phase Payment plan (pay at each 6-week phase) or Pay in Full at a discount</li>
            <li>Can start as early as Week 1 Postpartum</li>
            <li>Diastasis Recti recovery focus & guidance</li>
            <li>Pelvic Floor recovery focus & guidance</li>
            <li>Get into functional mom strength the right way</li>
            <li>Weekly check-in with Brit + zoom call with each phase</li>
            <li>Weekly exercise guidance (with tutorial videos)</li>
            <li>Weekly mental health tips & guidance</li>
          </ul>
          <div className={styles.sectionTitle} onClick={toggleDropdown}>
            What to Expect <span className={styles.sectionTitleIcon}>{isDropdownOpen ? '−' : '+'}</span>
          </div>
          {isDropdownOpen && (
            <div className={styles.dropdownContent}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
              <p>Pellentesque dapibus suscipit ligula. Donec posuere augue in quam.</p>
              <p>Etiam vel tortor sodales, mollis eros ac, maximus purus.</p>
              {/* Add more content as needed */}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default ProductComponent;
  