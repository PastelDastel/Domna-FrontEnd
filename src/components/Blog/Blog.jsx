/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import styles from "./Blog.module.css"; // Make sure your CSS module is correctly named and located
import Hero from "../Home/Hero/Hero";
import { Link } from "react-router-dom";

const Blog = () => {
  const BlogWrapper = ({ category, description }) => {
    const containerRef = useRef();
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
      if (containerRef.current) {
        const posts = containerRef.current.querySelectorAll(
          `.${styles.blogPost}`
        );
        posts.forEach((post, index) => {
          if (index >= 5) {
            post.classList.add("extra-post"); // Mark as initially hidden
            post.style.display = "none"; // Hide posts beyond the sixth
          }
        });
      }
    }, []);

    const toggleExtraPosts = (e) => {
      const button = e.target;
      const extraPosts = containerRef.current.querySelectorAll(
        `.${styles.blogPost}.extra-post`
      );

      if (isExpanded) {
        // Collapse all extra posts back to hidden
        extraPosts.forEach((post) => fadeOut(post, 200)); // Faster fade-out
        button.textContent = "Leggi tutti gli articoli";
        setIsExpanded(false);
      } else {
        // Show all hidden posts with fade-in
        extraPosts.forEach((post) => fadeIn(post, 500)); // Slower fade-in
        button.textContent = "Mostra meno articoli";
        setIsExpanded(true);
      }
    };

    const fadeIn = (element, duration) => {
      element.style.opacity = 0;
      element.style.display = "block";

      let start = null;
      function animateFadeIn(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.min(progress / duration, 1);
        element.style.opacity = opacity;
        if (progress < duration) {
          requestAnimationFrame(animateFadeIn);
        }
      }
      requestAnimationFrame(animateFadeIn);
    };

    const fadeOut = (element, duration) => {
      let start = null;
      function animateFadeOut(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.max(1 - progress / duration, 0);
        element.style.opacity = opacity;
        if (progress < duration) {
          requestAnimationFrame(animateFadeOut);
        } else {
          element.style.display = "none";
        }
      }
      requestAnimationFrame(animateFadeOut);
    };

    return (
      <div className={styles.blogCategory} ref={containerRef}>
        <h2 className={styles.categoryTitle}>{category}</h2>
        <p className={styles.categoryDescription}>{description}</p>
        <div className={styles.blogContainer}>
          {Array.from({ length: 12 }).map((_, index) => (
            <BlogArticle
              key={index}
              img={"https://placehold.co/200x200"}
              title={`Blog Post ${index + 1}`}
              description={
                "Scopri come l'allenamento funzionale può aiutarti a migliorare la tua resistenza e forza..."
              }
            />
          ))}
        </div>
        <button className={styles.categoryLink} onClick={toggleExtraPosts}>
          Leggi tutti gli articoli
        </button>
      </div>
    );
  };

  const BlogArticle = ({ img, title, description }) => {
    return (
      <div className={styles.blogPost}>
        <img src={img} alt={`${title} Immagine`} />
        <div className={styles.blogContent}>
          <h3>{title}</h3>
          <p>{description}</p>
          <Link to={`/blog/article/${title}`} className={styles.readMore}>
            Leggi di più
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Hero
        animatedText={"Articoli vari"}
        text={"Blog"}
        textAlignment={"center"}
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
