import Hero from "./Hero/Hero";
import ParallaxSection from "./Parallax Section/ParallaxSection";
import FadeInSection from "./Fade In/FadeInSection";
import Section from "./Section/Section";
import TestimonialsSlider from "./TestimonialSection/TestimonialsSlider";
import ContactSection from "./Contact Section/ContactSection";
import MetaPixel from "../Global Components/MetaPixel";
import { motion } from "framer-motion";
const animationVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};
const Home = () => {
  return (
    <>
      <MetaPixel pixelId={"410616855425028"} />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Hero
          text="DOMNA"
          animatedText="ALLENAMENTO FUNZIONALE FEMMINILE."
          textAlignment="left"
        />
      </motion.div>
      {/* <ParallaxSection
        text="Allenati Con DOMNA"
        id="first"
      />

      <Section />

      <ParallaxSection
        text="Recensioni Clienti DOMNA" id="second" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1.2 } }}>
        <TestimonialsSlider />
      </motion.div>

      <ContactSection /> */}
    </>
  );
};

export default Home;
