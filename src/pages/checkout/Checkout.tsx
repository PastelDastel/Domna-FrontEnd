import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import "./Checkout.css";

const stripePromise = loadStripe(
  "pk_live_51OcQMBKn6sYGkBb0O6KhMw9kfYhDZj0R4E5CFLiw1pdETW0nKIWr2VPyNJPv1NVgD0vDaGNVqXltzHwFQd3TLp8H00PQnLudBr"
);

interface Course {
  id: string;
  name: string;
  price: number;
  description: string;
}

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = (location.state as { course: Course })?.course;

  useEffect(() => {
    if (!course) {
      console.error("No course data found, redirecting to homepage.");
      navigate("/");
    }
  }, [course, navigate]);

  const handlePurchase = async () => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
  
    if (!user) {
      alert("Devi essere autenticato per acquistare un corso.");
      navigate("/login");
      return;
    }
  
    const token = localStorage.getItem("token"); // Assuming JWT token is stored in localStorage as 'token'
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe non è stato caricato correttamente.");
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:8083/.functions/function-main/protected/subscribe/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Attach JWT token here
          },
          body: JSON.stringify({ courseId: "672022a8716f3bbbc7445cd9" }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
  
      const result = await response.json();
  
      if (result.sessionId) {
        await stripe.redirectToCheckout({ sessionId: result.sessionId });
      } else {
        alert("Errore durante il checkout. Riprova più tardi.");
      }
    } catch (error) {
      console.log("Errore durante il checkout:", error);
      alert(
        "Si è verificato un errore durante il checkout. Controlla la console per maggiori dettagli." + error
      );
    }
  };
  

  return (
    <div className="page-container">
      <div className="checkout">
        <h1>Riepilogo Ordine</h1>
        {course ? (
          <div className="order-summary">
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <p>
              <strong>Prezzo:</strong> {course.price}€
            </p>
            <button onClick={handlePurchase}>Completa l'acquisto</button>
          </div>
        ) : (
          <p>Nessun corso selezionato per il checkout.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
