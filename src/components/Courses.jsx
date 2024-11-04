import Hero from "./Home Page Components/Hero/Hero";
import ParallaxSection from "./Home Page Components/ParallaxSection/ParallaxSection";
import FadeInSection from "./Home Page Components/FadeInSection/FadeInSection";
import Section from "./Home Page Components/Section/Section";
import TestimonialsSlider from "./Home Page Components/TestimonialsSlider/TestimonialsSlider";
import ContactSection from "./Home Page Components/ContactSection/ContactSection";
import CourseArticle from "./Courses Page Components/CourseArticle/CourseArticle";
const Courses = () => {
  return (
    <>
      <Hero //this must not be parallax
        text="Ciao"
        animatedText="Corsi"
        textAlignment="center"
      />
      <ParallaxSection
        imageUrl="https://placehold.co/1920x1080/ffa0b1/f08b92"
        text="Corsi Domna"
        id="ParallaxFirstDivisor"
        startOffset={0}
      />
            <CourseArticle />

      <FadeInSection>
        <Section
          title="Corsi"
          content1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris."
          content2="Vestibulum in pellentesque mauris. Nulla non elit nec purus scelerisque."
          linkText="Scopri di più"
          link="/courses"
          imageUrl="https://placehold.co/1920x1080/f08b92/ffa0b1"
          reverse={false}
          top={150}
          left={475}
        />{" "}
        <Section
          title="Corsi"
          content1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris."
          content2="Vestibulum in pellentesque mauris. Nulla non elit nec purus scelerisque."
          linkText="Scopri di più"
          link="/courses"
          imageUrl="https://placehold.co/1920x1080/f08b92/ffa0b1"
          reverse={false}
          top={150}
          left={475}
        />{" "}
        <Section
          title="Corsi"
          content1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris."
          content2="Vestibulum in pellentesque mauris. Nulla non elit nec purus scelerisque."
          linkText="Scopri di più"
          link="/courses"
          imageUrl="https://placehold.co/1920x1080/f08b92/ffa0b1"
          reverse={false}
          top={150}
          left={475}
        />
      </FadeInSection>
      <ParallaxSection
        imageUrl="https://placehold.co/4000x4000/f08b92/ffa0b1"
        text="Domna Live"
        id="ParallaxSecondDivisor"
        startOffset={1000}
      />{" "}
      <FadeInSection>
        <Section
          title="Corsi"
          content1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris."
          content2="Vestibulum in pellentesque mauris. Nulla non elit nec purus scelerisque."
          linkText="Scopri di più"
          link="/courses"
          imageUrl="https://placehold.co/1920x1080/f08b92/ffa0b1"
          reverse={false}
          top={150}
          left={475}
        />{" "}
        <Section
          title="Corsi"
          content1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris."
          content2="Vestibulum in pellentesque mauris. Nulla non elit nec purus scelerisque."
          linkText="Scopri di più"
          link="/courses"
          imageUrl="https://placehold.co/1920x1080/f08b92/ffa0b1"
          reverse={false}
          top={150}
          left={475}
        />{" "}
        <Section
          title="Corsi"
          content1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris."
          content2="Vestibulum in pellentesque mauris. Nulla non elit nec purus scelerisque."
          linkText="Scopri di più"
          link="/courses"
          imageUrl="https://placehold.co/1920x1080/f08b92/ffa0b1"
          reverse={false}
          top={150}
          left={475}
        />
      </FadeInSection>{" "}
      <ParallaxSection
        imageUrl="https://placehold.co/4000x4000/f08b92/ffa0b1"
        text="Allenamenti di gruppo"
        id="ParallaxSecondDivisor"
        startOffset={2500}
      />
    </>
  );
};

export default Courses;
