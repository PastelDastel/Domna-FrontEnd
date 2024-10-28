import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Courses from "./pages/courses/Courses"; // Ensure this exists
import Contact from "./pages/contact/Contact";
import MyCourse from "./pages/mycourses/mycourse";
import ProtectedRoute from "./components/ProtectedRoutes";
import Checkout from "./pages/checkout/checkout";
const App: React.FC = () => {
  return (
    <UserContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <MyCourse />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route 
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }/>
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
