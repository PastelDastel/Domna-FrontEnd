import Navbar from "../../components/Navbar";
import SocialIcons from "../../components/SocialIcons";
import Footer from "../../components/Footer";
import { ParallaxProvider } from "react-scroll-parallax";
import ParallaxSection from "../../components/ParallaxSection";
const Home = () => {
  return (
    <ParallaxProvider>
      <Navbar />
      <ParallaxSection text="Domna" background="https://placehold.co/600x400/blue/blue" coords={[-60, 60]} />
      <div>Ciao</div>
      <ParallaxSection text="Domna" background="https://placehold.co/600x400/gray/gray" coords={[0, 60]} />
      <ParallaxSection text="Domna" background="https://placehold.co/600x400/blue/blue" coords={[0, 60]} />
      <ParallaxSection text="Domna" background="https://placehold.co/600x400/gray/gray" coords={[0, 60]} />
      <ParallaxSection text="Domna" background="https://placehold.co/600x400/blue/blue" coords={[0, 60]} />
      <ParallaxSection text="Domna" background="https://placehold.co/600x400/gray/gray" coords={[0, 60]} />
      <ParallaxSection text="Domna" background="https://placehold.co/600x400/blue/blue" coords={[0, 60]} />
      <SocialIcons />
      <Footer />
    </ParallaxProvider>
  );
};

export default Home;
