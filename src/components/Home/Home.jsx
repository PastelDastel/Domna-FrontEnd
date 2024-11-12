import Hero from "./Hero/Hero";
import ParallaxSection from "./Parallax Section/ParallaxSection";
import FadeInSection from "./Fade In/FadeInSection";
import Section from "./Section/Section";
import TestimonialsSlider from "./TestimonialSection/TestimonialsSlider";
import ContactSection from "./Contact Section/ContactSection";
 import MetaPixel from "../Global Components/MetaPixel";
const Home = () => {
  return (
    <>
      <MetaPixel pixelId={"410616855425028"} />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Hero
          text="Domna"
          animatedText="Allenamento funzionale femminile."
          textAlignment="left"
        />
      </motion.div>
      
      <ParallaxSection
        imageUrl="https://placehold.co/1920x1080/ffa0b1/f08b92"
        text="Allenati Con DOMNA"
        id="ParallaxFirstDivisor"
        startOffset={0}
      />

      <FadeInSection>
        <motion.div initial="hidden" whileInView="visible" variants={animationVariants}>
          <Section
            title="Metodo DOMNA"
            content1="Il metodo Domna è un percorso dedicato alle donne che desiderano riscoprire la propria armonia."
            content2="Domna è un percorso dedicato alle donne che supporta il cambiamento e la trasformazione attraverso livelli di allenamento."
            linkText="Scopri di più"
            link="/courses"
            imageUrl="https://placehold.co/1920x1080/f08b92/ffa0b1"
            reverse={false}
            top={150}
            left={475}
          />
        </motion.div>
      </FadeInSection>

      <FadeInSection>
        <motion.div initial="hidden" whileInView="visible" variants={animationVariants}>
          <Section
            title="Obiettivi DOMNA"
            content1="Domna propone un nuovo punto di vista per la trasformazione del corpo e la riscoperta della bellezza autentica."
            content2="Dimentica gli allenamenti e immagina una piacevole educazione al movimento."
            linkText="Scopri di più"
            link="/about"
            imageUrl="https://placehold.co/1920x1080/ffa0b1/f08b92"
            reverse={true}
            top={125}
            left={-400}
          />
        </motion.div>
      </FadeInSection>

      <FadeInSection>
        <motion.div initial="hidden" whileInView="visible" variants={animationVariants}>
          <Section
            title="Sei indecisa? Scopri il percorso adatto a te!"
            content1="DOMNA ti guida in ogni passo. Rispondi al nostro quiz per trovare il percorso perfetto per le tue esigenze e obiettivi."
            content2=""
            linkText="Scopri il percorso ideale"
            link="/qna"
            imageUrl="https://placehold.co/1920x1080/f08b92/ffa0b1"
            reverse={false}
            top={125}
            left={475}
          />
        </motion.div>
      </FadeInSection>

      <ParallaxSection
        imageUrl="https://placehold.co/4000x4000/f08b92/ffa0b1"
        text="Recensioni Clienti DOMNA"
        id="ParallaxSecondDivisor"
        startOffset={1000}
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
      </FadeInSection>
    </>
  );
};

export default Home;
