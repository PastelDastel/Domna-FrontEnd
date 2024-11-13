import { Outlet } from "react-router-dom"
import Navbar from "./Navbar/Navbar"
import Hero from "../Home/Hero/Hero"
import ParallaxSection from "../Home/Parallax Section/ParallaxSection"
import FadeInSection from "../Home/Fade In/FadeInSection"
import Section from "../Home/Section/Section"
import TestimonialsSlider from "../Home/TestimonialSection/TestimonialsSlider"
import ContactSection from "../Home/Contact Section/ContactSection"
const Layout = () => {
    return (
        <main className="App">
            <Navbar />

            {<Outlet />}
        </main>
    )
}

export default Layout
