import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; 
import Homepage from './components/Homepage'; 
import CreationEvennement from './components/CreationEvennement';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/CreationEvennement" element={<CreationEvennement />} />
                <Route path="/Vignerons" element={<Login />} />
                <Route path="/Prestataires" element={<Homepage />} />
            </Routes>
        </Router>
    );
}

export default App;
