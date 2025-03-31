import { useState } from "react";
import {
    useStripe,
    useElements,
    CardElement
} from "@stripe/react-stripe-js";

import styles from "./style.module.css"; // Reusa le classi .stripeComponent_*

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_API_STRIPE_PUBLIC_KEY);

const UpdatePaymentMethodForm = ({ onSuccess, axiosPrivate }) => {
    const stripe = useStripe();
    const elements = useElements();
    console.log("Axios private in form: ", axiosPrivate);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setLoading(true);
        setError(null);
        setSuccess(false);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            setError(error.message || "Payment method creation failed");
            setLoading(false);
            return;
        }

        try {
            const response = await axiosPrivate.post("/api/update-payment", {
                payment_method: paymentMethod.id,
            });

            if (response.status !== 200) {
                throw new Error("Failed to update payment method");
            }
            // Handle success response if needed
            console.log("Payment method updated successfully:", response.data);

            setSuccess(true);
            onSuccess?.();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.stripeComponent}>
            <form onSubmit={handleSubmit} className={styles.stripeComponent_form}>
                <div className={styles.stripeComponent_cardWrapper}>
                    <CardElement />
                </div>

                {error && <div className={styles.stripeComponent_error}>{error}</div>}
                {success && (
                    <div className={styles.stripeComponent_success}>
                        Payment method updated!
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className={styles.stripeComponent_submitButton}
                >
                    {loading ? "Updating..." : "Update Payment Method"}
                </button>
            </form>
        </div>
    );
};


const StripeCheckout = ({ axiosPrivate }) => {
    const [paymentMethodUpdated, setPaymentMethodUpdated] = useState(false);
    console.log("Axios private: ", axiosPrivate);
    const handleSuccess = () => {
        setPaymentMethodUpdated(true);
    };

    return (
        <Elements stripe={stripePromise}>
            <div className={styles.stripeComponent}>
                <h1 className={styles.stripeComponent_title}>Update Payment Method</h1>
                {!paymentMethodUpdated ? (
                    <UpdatePaymentMethodForm onSuccess={handleSuccess} axiosPrivate={axiosPrivate} />
                ) : (
                    <div className={styles.stripeComponent_success}>
                        Payment method updated successfully!
                    </div>
                )}
            </div>
        </Elements>
    );
}
export default StripeCheckout;
