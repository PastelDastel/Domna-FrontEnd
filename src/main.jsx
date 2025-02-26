/* eslint-disable no-unused-vars */
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import './index.css'; // Global CSS
import Analytics from "./components/Global Components/Google Analytics/Tracking";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Analytics />
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
