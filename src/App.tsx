import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContextProvider from './context/UserContext'; // Import UserContextProvider
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
    return (
        <UserContextProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" Component={Home} />
                    <Route path="/profile" Component={Profile} />
                    <Route path="/login" Component={Login} />
                    <Route path="/register" Component={Register} />
                </Routes>
            </Router>
        </UserContextProvider>
    );
};

export default App;
