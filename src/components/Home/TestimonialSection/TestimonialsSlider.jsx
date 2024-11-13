import React, { useState, useEffect } from "react";
import Testimonial from "./Testimonial/Testimonial";

const testimonialsData = [
  {
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Valentina",
    role: "Cliente Domna",
    text: "Ho iniziato il percorso ‘Domna’ e non potrei essere più soddisfatta! La preparazione è stata fondamentale per acquisire forza e flessibilità. Ho trasformato i miei desideri in realtà grazie a questo programma. Consiglio vivamente a tutte le donne che desiderano un cambiamento reale nella loro vita.",
    rating: 4.5,
  },
  {
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Giulia",
    role: "Cliente Domna",
    text: "Il programma Domna ha cambiato la mia vita. Lo consiglio a tutte!",
    rating: 5,
  },
  {
    image: "https://randomuser.me/api/portraits/women/46.jpg",
    name: "Sofia",
    role: "Cliente Domna",
    text: "Mi sento più forte e sicura grazie al percorso Domna.",
    rating: 4,
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out effect

      setTimeout(() => {
        // Update to the next testimonial
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true); // Fade in the new testimonial
      }, 1000); // Matches the fade-out duration
    }, 5000); // Each testimonial shows for 5 seconds

    return () => clearInterval(interval);
  }, []);

  const { image, name, role, text, rating } = testimonialsData[currentIndex];

  return (
    <div
      className={`flex justify-center items-center w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto p-4 sm:p-8 md:p-10 lg:p-12 transition-opacity duration-1000 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      <Testimonial image={image} name={name} role={role} text={text} rating={rating} />
    </div>
  );
};

export default TestimonialSlider;
