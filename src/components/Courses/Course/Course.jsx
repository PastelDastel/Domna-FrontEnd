import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import style from "./Course.module.css";

const Course = ({ course }) => {
    const {
        Title, Description, Price,
        CourseId,
        Interval
    } = course;



    const {
        title,
        benefits = [],
        excluded_benefits = [],
        stripePriceId,
        _id: courseId,
        description,
        duration,
        price,
        discountedPrice
    } = course;


    const navigate = useNavigate();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleAddToCart = async () => {
        if (auth?.accessToken) {
            setIsLoading(true);
            try {
                const orderData = {
                    productName: Title,
                    price: Price.Discounted || Price.Normal,
                    stripePriceId: Price.Stripe,
                    userId: auth.id,
                    billingInterval: Interval,
                    courseId: CourseId,
                };
                const response = await axiosPrivate.post('/api/orders', orderData);
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
            <hr className={style.fullWidthLine} />
            <div className={style.container}>
                <div className={style.leftColumn}>
                    <h1 className={style.productTitle}>{Title}</h1>
                    {/* if discounted Price is null or doesnt exist 
                    then we will not show the discount badge
                    */
                        Price.Discounted ? (
                            <p className={style.price}>
                                <>
                                    <span className={style.discountBadge}>
                                        -{Math.round(((Price.Normal - Price.Discounted) / Price.Normal) * 100)}%
                                    </span>
                                    <span className={style.discountedPrice}>${discountedPrice}</span>
                                    <del className={style.originalPrice}>${price}</del>
                                </>
                            </p>
                        ) : (
                            <p className={style.price}>
                                <span className={style.noDiscountPrice}>${Price.Normal}</span>
                            </p>
                        )}

                    <p className={style.guarantee}>
                        ✅ 100% soddisfatti o rimborsati!
                    </p>

                    <button
                        className={style.addToCartBtn}
                        onClick={handleAddToCart}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Salvando...' : 'Ottieni il corso ora!'}
                    </button>
                </div>

                <div className={style.rightColumn}>
                    <ul className={style.featuresList}>
                        {benefits.map((benefit, index) => (
                            <li key={index}>
                                <span className={style.icon}>✔</span> {benefit}
                            </li>
                        ))}
                        {excluded_benefits.map((excluded, index) => (
                            <li key={`excluded-${index}`} className={style.strikethrough}>
                                <span className={style.icon}>✖</span> {excluded}
                            </li>
                        ))}
                    </ul>
                    <div className={style.reviews}>
                        <p><em>&quot;Fantastico corso, mi ha cambiato la vita!&quot;</em> - Maria</p>
                        <p><em>&quot;Ho visto risultati dopo una settimana!&quot;</em> - Luca</p>
                    </div>
                </div>
            </div>
            <hr className={style.fullWidthLine} />
            <div className={style.sectionTitle} onClick={toggleDropdown} aria-expanded={isDropdownOpen}>
                <span>Cosa aspettarsi</span>
                <span className={style.dropdownIcon}>{isDropdownOpen ? '▲' : '▼'}</span>
            </div>
            <div className={`${style.sectionContent} ${isDropdownOpen ? style.show : ''}`}>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </div>
            <div className={style.courseSeparator}></div>
        </>
    );
};

export default Course;
