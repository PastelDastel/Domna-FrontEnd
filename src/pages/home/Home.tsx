import Navbar from "../../components/navbar/Navbar";
import SocialIcons from "../../components/socialicons/SocialIcons";
import Footer from "../../components/footer/Footer";
import { ParallaxProvider } from "react-scroll-parallax";
import FirstSection from "../../components/FirstSection/FirstSection";
import ParallaxArticle from "../../components/ParallaxArticle/ParallaxArticle";

const Home = () => {
  return (
    <ParallaxProvider>
      <Navbar />
      <FirstSection background="https://placehold.co/600x400/lightpink/lightgray" coords={[-60, 60]} />
      
      <ParallaxArticle 
        background="https://placehold.co/600x400/gray/lightgray" 
        coords={[0, 60]} 
        text="Happy you're here" 
      />

      {/* Static About Me Section without parallax effect */}
      <div className="about-section">
        <h2>About me</h2>
        <p>This section stays in place without the parallax effect.</p>
      </div>
      
      {/* Footer Section */}
      <div className="footer-section">
        <SocialIcons />
        <Footer />
      </div>
    </ParallaxProvider>
  );
};

export default Home;
