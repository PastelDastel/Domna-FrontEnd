import { useEffect } from "react";
import LetterAnimation from "../Letter Animation/LetterAnimation";

const Hero = ({ text, animatedText, textAlignment }) => {
  console.log(text, animatedText);

  useEffect(() => {
    const heroElement = document.getElementById("heroS");

    // Set the initial background position based on the current scroll position
    const initialScrollPosition = window.scrollY;
    heroElement.style.backgroundPositionY = `-${initialScrollPosition * 0.3}px`;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      heroElement.style.backgroundPositionY = `-${scrollPosition * 0.3}px`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[90vh] md:h-[85vh] overflow-hidden bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080')" }} id="heroS">
      <div className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col justify-center items-${textAlignment}`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between w-full px-8">
          <div className="mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-4 text-center md:text-left">
              {text}
            </h1>
            <div className="text-2xl md:text-4xl lg:text-5xl text-pink-500 text-center md:text-left">
              {/* Your letter animation component here */}
              <LetterAnimation text={animatedText} />
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex flex-row justify-center md:flex-col md:justify-start space-x-4 md:space-x-0 md:space-y-4 text-white text-2xl md:text-3xl lg:text-4xl mt-4 md:mt-0">
            <a href="https://www.facebook.com/domnaallenamentofunzionalefemminile" className="hover:text-pink-500">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/domna_allenamentofemminile/" className="hover:text-pink-500">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@frutteromarcella.domna" className="hover:text-pink-500">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bounce Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-3xl text-pink-500 animate-bounce">
        <a href="#ParallaxFirstDivisor">
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </div>
  );
};

export default Hero;
