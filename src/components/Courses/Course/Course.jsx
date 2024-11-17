import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth"; // Import your auth hook/context
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"; // Import your custom axios instance
import style from "./Course.module.css";

const Course = ({ course }) => {
    const {
        title,
        benefits = [],
        excluded_benefits = [],
        price,
        discountedPrice,
        _id: courseId,
        description,
    } = course;

    const navigate = useNavigate();
    const { auth } = useAuth(); // Get the authentication status
    const axiosPrivate = useAxiosPrivate(); // Get the axios instance with auth headers
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

    const handleAddToCart = async () => {
        if (auth?.accessToken) {
            setIsLoading(true);
            try {
                const orderData = {
                    productName: title,
                    price: discountedPrice || price,
                    quantity,
                    userId: auth.id,
                    courseId,
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

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <hr className={style.fullWidthLine} /> {/* Full-width line */}
            <div className={style.container}>
                <div className={style.leftColumn}>
                    <h1 className={style.productTitle}>{title}</h1>
                    <p className={style.price}>
                        {discountedPrice ? (
                            <>
                                <span className={style.discountedPrice}>${discountedPrice}</span>
                                <del className={style.originalPrice}>${price}</del>
                            </>
                        ) : (
                            <span className={style.originalPrice}>${price}</span>
                        )}
                    </p>
                    <div className={style.quantityContainer}>
                        <label className={style.quantityLabel} htmlFor="quantity">Quantity:</label>
                        <input
                            className={style.quantityInput}
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            min="1"
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    </div>
                    <button
                        className={style.addToCartBtn}
                        onClick={handleAddToCart}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Salvando...' : 'Aggiungi al carrello'}
                    </button>
                </div>

                <div className={style.rightColumn}>
                    <ul className={style.featuresList}>
                        {benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                        {excluded_benefits.map((excluded, index) => (
                            <li key={`excluded-${index}`} className={style.strikethrough}>
                                {excluded}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <hr className={style.fullWidthLine} /> {/* Full-width line */}
            <div className={style.sectionTitle} onClick={toggleDropdown} aria-expanded={isDropdownOpen}>
                <span>Cosa aspettarsi</span>
                <span>{isDropdownOpen ? '−' : '+'}</span>
            </div>
            <div className={`${style.sectionContent} ${isDropdownOpen ? style.show : ''}`}>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </div>
            <div className={style.courseSeparator}></div>
        </>
    );
};

export default Course;
