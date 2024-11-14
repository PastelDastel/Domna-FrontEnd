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
      <ParallaxSection
        text="Allenati Con DOMNA"
        id="ParallaxFirstDivisor"
        startOffset={0}
      />

      <Section />

      <ParallaxSection
        text="Recensioni Clienti DOMNA" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1.2 } }}>
        <TestimonialsSlider />
      </motion.div>

      <ContactSection />


      {
      /*
      <ParallaxSection
        imageUrl="https://placehold.co/1920x1080/f08b92/ffa0b1"
        text="Recensioni Clienti DOMNA"
        id="ParallaxSecondDivisor"
        startOffset={2500}
      />
      <FadeInSection>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1.2 } }}>
          <TestimonialsSlider />
        </motion.div>
      </FadeInSection>
      <FadeInSection>
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}>
          <ContactSection />
        </motion.div>
      </FadeInSection> */}
    </>
  );
};

export default Home;
