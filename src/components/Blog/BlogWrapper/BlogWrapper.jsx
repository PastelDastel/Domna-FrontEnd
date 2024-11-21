import style from "./BlogWrapper.module.css";
import { useLayoutEffect, useRef, useState } from "react";
import BlogArticle from "../BlogArticle/BlogArticle";

// Move the getVisiblePosts function outside the component
const getVisiblePosts = (width) => {
    if (width <= 577) return 3;
    if (width <= 822) return 4;
    if (width <= 1066) return 5;
    if (width <= 1311) return 6;
    if (width <= 1555) return 7;
    return 6; 
};

const BlogWrapper = ({ category, description }) => {
    const containerRef = useRef();
    const [isExpanded, setIsExpanded] = useState(false);
    const [visiblePosts, setVisiblePosts] = useState(getVisiblePosts(window.innerWidth)); // Initialize visible posts

    useLayoutEffect(() => {
        const updateVisiblePosts = () => {
            const posts = containerRef.current?.querySelectorAll("[class^='_blogPost_']") || [];
            posts.forEach((post, index) => {
                if (index < visiblePosts || isExpanded) {
                    post.style.display = "block"; // Show posts within the limit or all if expanded
                } else {
                    post.style.display = "none"; // Hide the rest
                }
            });
        };

        updateVisiblePosts(); // Run initially

        const handleResize = () => {
            const newVisiblePosts = getVisiblePosts(window.innerWidth);
            setVisiblePosts(newVisiblePosts); // Update visible posts count on resize
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [visiblePosts, isExpanded]); // Re-run effect when visiblePosts or isExpanded changes

    const toggleExtraPosts = (e) => {
        setIsExpanded((prev) => !prev); // Toggle expanded state
    };

    return (
        <div className={style.blogCategory} ref={containerRef}>
            <h2 className={style.categoryTitle}>{category}</h2>
            <p className={style.categoryDescription}>{description}</p>
            <div className={style.blogContainer}>
                {Array.from({ length: 12 }).map((_, index) => (
                    <BlogArticle
                        key={index}
                        img={"https://placehold.co/200x200"}
                        title={`Blog Post ${index + 1}`}
                        description={
                            "Scopri come l'allenamento funzionale può aiutarti a migliorare la tua resistenza e forza..."
                        }
                        className={`${style.blogPost} ${index >= visiblePosts ? style.extraPost : ''}`}
                    />
                ))}
            </div>
            <button className={style.categoryLink} onClick={toggleExtraPosts}>
                {isExpanded ? "Mostra meno articoli" : "Leggi tutti gli articoli"}
            </button>
        </div>
    );
};

export default BlogWrapper;
