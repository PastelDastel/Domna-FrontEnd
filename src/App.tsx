import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContextProvider from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses'; // Ensure this exists
import Contact from './pages/Contact';
const App: React.FC = () => {
    return (
        <UserContextProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Router>
        </UserContextProvider>
    );
};

export default App;
