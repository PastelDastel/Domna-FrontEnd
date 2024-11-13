import { useEffect } from "react";

const ParallaxSection = ({ imageUrl, text, id, startOffset = 0 }) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const parallaxElement = document.getElementById(id);

      if (parallaxElement && scrollPosition > startOffset) {
        parallaxElement.style.backgroundPositionY = `-${(scrollPosition - startOffset) * 0.3}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id, startOffset]);

  return (
    <div
      id={id}
      className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] bg-cover bg-center bg-fixed flex justify-center items-center"
      style={{ backgroundImage: `url("${imageUrl}")` }}
    >
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-bold text-center px-4 sm:px-8">
        {text}
      </p>
    </div>
  );
};

export default ParallaxSection;
