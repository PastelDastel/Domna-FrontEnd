import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "axios";

// Replace with your actual Stripe publishable key stored securely
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
                const response = await axiosPrivate.get('/api/orders');
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
    
            // Create a checkout session on the backend
            const response = await axiosPrivate.post('/api/stripe/create-checkout-session', {
                priceId: 'price_1QEwYpKn6sYGkBb0YNfAHcGn' // Replace with the dynamic Price ID you want to use
            });
    
            // Redirect to Stripe Checkout
            const { id } = response.data;
            await stripe.redirectToCheckout({ sessionId: id });
        } catch (error) {
            console.error('Error during checkout:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDeleteOrder = async (orderId) => {
        try {
            await axiosPrivate.delete(`/api/orders/${orderId}`);
            setOrders(orders.filter(order => order._id !== orderId)); // Update state after deletion
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
            setEditOrderId(null); // Reset editing state
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    if (!auth?.accessToken) {
        return <p className="text-center text-red-500">Please log in to view your shopping cart.</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
            {orders.length > 0 ? (
                <div>
                    <ul className="space-y-4">
                        {orders.map((order, index) => (
                            <li key={index} className="p-4 border rounded-lg shadow">
                                <h2 className="text-lg font-semibold">{order.productName}</h2>
                                <p className="text-sm">Price: ${order.price}</p>
                                {editOrderId === order._id ? (
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="number"
                                            value={editQuantity}
                                            onChange={(e) => setEditQuantity(Number(e.target.value))}
                                            className="w-16 border rounded px-2 py-1"
                                        />
                                        <button
                                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                            onClick={handleUpdateOrder}
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-sm">Quantity: {order.quantity}</p>
                                        <p className="text-sm">Period: {order.period}</p>
                                        <div className="flex space-x-2 mt-2">
                                            <button
                                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                                onClick={() => handleEditOrder(order)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
                        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
                        onClick={handleCheckout}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                    </button>
                </div>
            ) : (
                <p className="text-lg">Your cart is empty.</p>
            )}
        </div>
    );
};

export default ShoppingCart;
