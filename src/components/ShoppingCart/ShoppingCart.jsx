import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./ShoppingCart.module.css"; // Import the CSS module
const stripeKey = "pk_live_51OcQMBKn6sYGkBb0O6KhMw9kfYhDZj0R4E5CFLiw1pdETW0nKIWr2VPyNJPv1NVgD0vDaGNVqXltzHwFQd3TLp8H00PQnLudBr";
const stripePromise = loadStripe(stripeKey);

const ShoppingCart = () => {
    const [orders, setOrders] = useState([]);
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosPrivate.get('/api/orders/unpaid');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        if (auth?.accessToken) {
            fetchOrders();
        }
    }, [auth, axiosPrivate]);

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const stripe = await stripePromise;
            const response = await axiosPrivate.post('/api/stripe/create-checkout-session', {
                lineItems: orders.map(order => ({
                    priceId: order.stripePriceId,
                    billingInterval: order.billingInterval,
                })),
            });
            const { sessions } = response.data;
            for (const session of sessions) {
                if (session.sessionId) {
                    await stripe.redirectToCheckout({ sessionId: session.sessionId });
                } else {
                    console.error("Session ID is missing in the response");
                }
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        } finally {
            setIsLoading(false);
            if (window.fbq) {
                window.fbq('track', 'CourseClicked', {
                    content_name: orders.map(order => order.productName).join(", "),
                    content_category: "Shopping Cart",
                    user_id: auth?.id || "guest"
                });
            }
        }
    };
    const handleDeleteOrder = async (orderId) => {
        try {
            await axiosPrivate.delete(`/api/orders/${orderId}`);
            setOrders(orders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    if (!auth?.accessToken) {
        return <p className={styles.error}>Please log in to view your shopping cart.</p>;
    }

    return (
        <div className={styles.container}>
            {orders.length > 0 ? (
                <div className={styles.ordersContainer}>
                    <h1 className={styles.title}>Your Shopping Cart</h1>
                    <ul className={styles.ordersList}>
                        {orders.map((order, index) => (
                            <li key={index} className={styles.orderItem}>
                                <h2 className={styles.orderTitle}>{order.productName}</h2>
                                <p className={styles.orderText}>Price: ${order.price}</p>

                                <>
                                    <p className={styles.orderText}>Quantity: {order.quantity}</p>
                                    <p className={styles.orderText}>Period: {order.period}</p>
                                    <div className={styles.buttonGroup}>
                                        <button
                                            className={`${styles.button} ${styles.deleteButton}`}
                                            onClick={() => handleDeleteOrder(order._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>

                            </li>
                        ))}
                    </ul>
                    <button
                        className={`${styles.checkoutButton} ${isLoading ? styles.disabled : ''}`}
                        onClick={handleCheckout}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                    </button>
                </div>
            ) : (
                <p className={styles.orderText}>Your cart is empty.</p>
            )}
        </div>
    );
};

export default ShoppingCart;
