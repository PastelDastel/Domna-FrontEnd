import React, { useState, useEffect } from "react";
import Testimonial from "./Testimonial/Testimonial";
import style from "./TestimonialsSlider.module.css";
import img from "../../../assets/JPG/laura.jpg";
import img2 from "../../../assets/JPG/monia.jpg";
import img3 from "../../../assets/JPG/danila.jpg";
import img4 from "../../../assets/JPG/silvia.jpg";

const testimonialsData = [
  {
    image: img2,
    name: "Monia",
    role: "Cliente Domna",
    text: "Grazie a Domna, sto finalmente risolvendo il mio problema alle gambe. Non avrei mai immaginato di vedere le mie gambe così leggere e sgonfie.",
    rating: 5,
  },
  {
    image: img4,
    name: "Silvia",
    role: "Cliente Domna",
    text: "Per trent'anni ho convissuto con una frustrante rigidità muscolare. Domna mi ha offerto un programma di allenamento che porta enormi benefici a chi soffre di mialgia. Da un anno mi alleno online e non ho più avuto alcuna problematica.",
    rating: 5,
  },
  {
    image: img3,
    name: "Danila",
    role: "Cliente Domna",
    text: "Dopo pochi mesi, grazie a Domna, i risultati sono evidenti sia sulla mia schiena che nella tonificazione del corpo.",
    rating: 4,
  },
  {
    image: img,
    name: "Laura",
    role: "Cliente Domna",
    text: "Domna e Marcella trasformano le cose più difficili in facili, divertendoci e accompagnandoci verso obiettivi ambiziosi.",
    rating: 4,
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out effect

      setTimeout(() => {
        // Move to the next testimonial after the fade-out
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true); // Trigger fade-in effect
      }, 1000); // Match the fade-out duration
    }, 5000); // Show each testimonial for 5 seconds

    return () => clearInterval(interval);
  }, []);

  const { image, name, role, text, rating } = testimonialsData[currentIndex];

  return (
    <div className={`${style.testimonialsWrapper} ${fade ? style.fadeIn : style.fadeOut}`}>
      <Testimonial image={image} name={name} role={role} text={text} rating={rating} />
    </div>
  );
};

export default TestimonialSlider;
