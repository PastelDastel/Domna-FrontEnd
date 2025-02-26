import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const Analytics = () => {
    const location = useLocation();

    useEffect(() => {
        ReactGA.initialize("G-YPGNE2HRN2"); // Sostituisci con il tuo ID di tracciamento
        ReactGA.send("pageview", { page_path: location.pathname });
    }, [location]);

    return null;
};

export default Analytics;
