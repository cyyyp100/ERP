import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; 
import Homepage from './components/Homepage'; 
import CreationEvennement from './components/CreationEvennement';
import PageVignerons from './components/PageVignerons'; 
import EventPage from './components/EventPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/creationEvennement" element={<CreationEvennement />} />
                <Route path="/PageVignerons" element={<PageVignerons/>} />
                <Route path="/Prestataires" element={<Homepage />} />
                <Route path="/event/:id" element={<EventPage />} />

            </Routes>
        </Router>
    );
}

export default App;
