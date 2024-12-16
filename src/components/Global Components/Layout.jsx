import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import Navbar from "./Navbar/Navbar"
const Layout = () => {
    // Scroll Listener (with passive: true)
    useEffect(() => {
        const handleScroll = () => {
            console.log("User is scrolling the page with video.");
        };

        // Attach scroll listener with passive: true
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Cleanup the listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <main className="App">
            <Navbar />
            {<Outlet />}
        </main>
    )
}

export default Layout
