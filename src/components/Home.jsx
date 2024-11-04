import Hero from "./Home Page Components/Hero/Hero";
import ParallaxSection from "./Home Page Components/ParallaxSection/ParallaxSection";
import FadeInSection from "./Home Page Components/FadeInSection/FadeInSection";
import Section from "./Home Page Components/Section/Section";
import TestimonialsSlider from "./Home Page Components/TestimonialsSlider/TestimonialsSlider";
import ContactSection from "./Home Page Components/ContactSection/ContactSection";
const Home = () => {
  return (
    <>
      <Hero />
      <ParallaxSection
        imageUrl="https://placehold.co/1920x1080/ffa0b1/f08b92"
        text="Allenati Con DOMNA"
        id="ParallaxFirstDivisor"
        startOffset={0}
      />
      <FadeInSection>
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
      </FadeInSection>
      <FadeInSection>
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
      </FadeInSection>
      <FadeInSection>
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
      </FadeInSection>
      <ParallaxSection
        imageUrl="https://placehold.co/4000x4000/f08b92/ffa0b1"
        text="Recensioni Clienti DOMNA"
        id="ParallaxSecondDivisor"
        startOffset={1000}
      />
      <FadeInSection>
        <TestimonialsSlider />
      </FadeInSection>
      <FadeInSection>
        <ContactSection />
      </FadeInSection>
    </>
  );
};

export default Home;
