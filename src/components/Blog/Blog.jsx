import Hero from "./Hero/Hero";
import BlogWrapper from "./BlogWrapper/BlogWrapper";
const Blog = () => {
  return (
    <div>
      <Hero
        animatedText={"Articoli vari"}
        text={"Blog DOMNA"}
      />
      <BlogWrapper
        category={"Allenamento"}
        description={
          "In questa sezione puoi trovare articoli per migliorare la tua forma fisica con esercizi mirati."
        }
      />
      <BlogWrapper
        category={"Nutrizione"}
        description={
          "Trova consigli utili per una dieta sana ed equilibrata che supporti il tuo allenamento."
        }
      />
      <BlogWrapper
        category={"Benessere"}
        description={
          "Esplora tecniche e pratiche per mantenere il tuo benessere mentale e fisico."
        }
      />
    </div>
  );
};

export default Blog;
