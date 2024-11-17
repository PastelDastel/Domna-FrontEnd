import style from "./BlogWrapper.module.css";
import { useLayoutEffect, useRef, useState } from "react";
import BlogArticle from "../BlogArticle/BlogArticle";

const BlogWrapper = ({ category, description }) => {
    const containerRef = useRef();
    const [isExpanded, setIsExpanded] = useState(false);

    useLayoutEffect(() => {
        if (containerRef.current) {
            // Select elements with class names that start with '_blogPost_'
            const posts = containerRef.current.querySelectorAll("[class^='_blogPost_']");
            console.log("All posts: ", posts); // Check if posts are now available
            posts.forEach((post, index) => {
                if (index >= 6) { // Hide articles starting from the 7th (index 6)
                    console.log("Hiding post: ", post);
                    post.classList.add(style.extraPost); // Apply module CSS class for hidden posts
                }
            });
        }
    }, []); // Runs synchronously after DOM updates but before painting

    const getElementsWithClassRegex = (parent, regex) => {
        // Get all elements within the parent
        const allElements = parent.querySelectorAll('*');
        // Filter elements that match the regex
        return Array.from(allElements).filter(element => {
            return Array.from(element.classList).some(className => regex.test(className));
        });
    };

    const toggleExtraPosts = (e) => {
        const button = e.target;
        // Get elements with class names that match the regex
        const extraPosts = getElementsWithClassRegex(containerRef.current, /^_extraPost_/);

        console.log("Found extra posts: ", extraPosts);

        if (extraPosts.length === 0) {
            console.error("No extra posts found. Check if the class name matches.");
            return;
        }

        if (isExpanded) {
            // Collapse only the extra posts
            extraPosts.forEach((post) => fadeOut(post, 500)); // Match the duration in CSS transition
            button.textContent = "Leggi tutti gli articoli";
            setIsExpanded(false);
        } else {
            // Expand the extra posts
            extraPosts.forEach((post) => fadeIn(post));
            button.textContent = "Mostra meno articoli";
            setIsExpanded(true);
        }
    };

    const fadeIn = (element) => {
        element.style.display = "block"; // Ensure the element is displayed
        requestAnimationFrame(() => {
            element.style.opacity = 1;
        });
    };

    const fadeOut = (element) => {
        element.style.opacity = 0;
        // Optionally use a timeout to hide the element after the transition completes
        setTimeout(() => {
            element.style.display = "none"; // Hide after the transition completes
        }, 500); // Match the duration in the CSS transition
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
                        className={`${style.blogPost} ${index >= 6 ? style.extraPost : ''}`} // Pass conditional className
                    />
                ))}
            </div>
            <button className={style.categoryLink} onClick={toggleExtraPosts}>
                Leggi tutti gli articoli
            </button>
        </div>
    );
};

export default BlogWrapper;
