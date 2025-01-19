import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/LoginPage';
import './styles.css'; 
import RegisterPage from './components/RegisterPage';
import AddEventPage from './components/AddEventPage';
import UpdateEventPage from './components/UpdateEventPage';
import Participate from './components/Participate';
import GeneratePass from './components/GeneratePass';


const App = () => {
    return (
        <Router>
            <div className="app">
                <Header /> 
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/AddEventPage" element={<AddEventPage />} />
                        <Route path="/update-event" element={<UpdateEventPage />} />
                        <Route path="/Participate" element={<Participate />} />
                        <Route path="/Generate-Pass" element={<GeneratePass />} />

                    </Routes>
                </main>
                <Footer /> 
            </div>
        </Router>
    );
};

export default App;
