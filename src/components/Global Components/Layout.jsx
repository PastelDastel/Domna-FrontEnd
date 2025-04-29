import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar/Navbar";
import CookieConsent from "../CookieForm/Component";
import Footer from "./Footer/Component";
const Layout = () => {
    const [isCookieModalOpen, setCookieModalOpen] = useState(false);
    console.log(isCookieModalOpen);
    return (
        <main className="App">
            <CookieConsent isOpen={isCookieModalOpen} setIsOpen={setCookieModalOpen} />
            <Navbar />
            <Outlet />
            {/* <Footer onOpenCookieModal={() => setCookieModalOpen(true)} /> */}
        </main>
    );
};

export default Layout;
