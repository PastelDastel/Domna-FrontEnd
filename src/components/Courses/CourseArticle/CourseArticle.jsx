import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth"; // Import your auth hook/context
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"; // Import your custom axios instance
import styles from "./CourseArticle.module.css";

const ProductComponent = ({ name, price, discountedPrice, featuresList, deniedList = [], whatToExpectHTML, period }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // Added quantity state
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const { auth } = useAuth(); // Get the authentication status
  const axiosPrivate = useAxiosPrivate(); // Get the axios instance with auth headers
  const [isLoading, setIsLoading] = useState(false);

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

  const handleAddToCart = async () => {
    if (auth?.accessToken) {
      setIsLoading(true);
      try {
        const orderData = {
          productName: name,
          price: discountedPrice || price,
          quantity, // Use quantity from state
          period : 1,
          userId: auth.id,
        };

        const response = await axiosPrivate.post('/api/orders', orderData);
        console.log('Order added:', response.data);
        navigate("/shopping-cart");
      } catch (error) {
        console.error('Error adding to cart:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      navigate("/login");
    }
  };

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
            value={quantity} // Controlled input value
            onChange={(e) => setQuantity(Number(e.target.value))} // Update quantity state
          />
        </div>
        <button
          className={styles.addToCartBtn}
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'AGGIUNGI AL CARRELLO'}
        </button>
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
