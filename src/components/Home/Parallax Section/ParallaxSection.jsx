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
      className="relative h-[400px] bg-cover bg-center bg-fixed flex justify-center items-center"
      style={{ backgroundImage: `url("${imageUrl}")` }}
    >
      <p className="text-4xl sm:text-5xl md:text-6xl lg:text-[35pt] text-white font-bold text-center">
        {text}
      </p>
    </div>
  );
};

export default ParallaxSection;
