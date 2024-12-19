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
    const [editOrderId, setEditOrderId] = useState(null);
    const [editQuantity, setEditQuantity] = useState(1);

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
                    quantity: order.quantity,
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

    const handleEditOrder = (order) => {
        setEditOrderId(order._id);
        setEditQuantity(order.quantity);
    };

    const handleUpdateOrder = async () => {
        try {
            const response = await axiosPrivate.put(`/api/orders/${editOrderId}`, {
                quantity: editQuantity,
            });
            setOrders(orders.map(order =>
                order._id === editOrderId ? { ...order, quantity: response.data.quantity } : order
            ));
            setEditOrderId(null);
        } catch (error) {
            console.error('Error updating order:', error);
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
                                {editOrderId === order._id ? (
                                    <div className={styles.editContainer}>
                                        <input
                                            type="number"
                                            value={editQuantity}
                                            onChange={(e) => setEditQuantity(Number(e.target.value))}
                                            className={styles.input}
                                        />
                                        <button
                                            className={`${styles.button} ${styles.saveButton}`}
                                            onClick={handleUpdateOrder}
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <p className={styles.orderText}>Quantity: {order.quantity}</p>
                                        <p className={styles.orderText}>Period: {order.period}</p>
                                        <div className={styles.buttonGroup}>
                                            <button
                                                className={`${styles.button} ${styles.editButton}`}
                                                onClick={() => handleEditOrder(order)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={`${styles.button} ${styles.deleteButton}`}
                                                onClick={() => handleDeleteOrder(order._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
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
