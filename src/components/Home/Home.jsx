import Hero from "./Hero/Hero";
import ParallaxSection from "./Parallax Section/ParallaxSection";
import Section from "./Section/Section";
import TestimonialsSlider from "./TestimonialSection/TestimonialsSlider";
import ContactSection from "./Contact Section/ContactSection";
import MetaPixel from "../Global Components/MetaPixel";
import { motion } from "framer-motion";

import useAuth from "../../hooks/useAuth";


// Funzione per leggere il cookie delle preferenze
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    let [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

// Recupera le preferenze dei cookie
const preferences = getCookie("cookiePreferences");
const marketingEnabled = preferences ? JSON.parse(preferences).marketing : false;

const Home = () => {
  const { auth } = useAuth();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Hero
          text="DOMNA"
          animatedText="ALLENAMENTO FUNZIONALE FEMMINILE"
          textAlignment="left"
        />
      </motion.div>

      {/* <ParallaxSection text="Allenati Con DOMNA" id="first" />
      <Section />
      <ParallaxSection text="Recensioni Clienti DOMNA" id="second" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1.2 } }}>
        <TestimonialsSlider />
      </motion.div>

      <ContactSection /> */}
    </>
  );
};

export default Home;
