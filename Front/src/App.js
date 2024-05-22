// /mnt/data/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Homepage from './components/Homepage';
import CreationEvennement from './components/CreationEvennement';
import PageVignerons from './components/PageVignerons';
import PagePrestataires from './components/PagePrestataires';
import PageSponsors from './components/PageSponsors'; // Ajouté
import PageAnimations from './components/PageAnimations'; // Ajouté
import PageMateriels from './components/PageMateriels'; // Ajouté
import EventPage from './components/EventPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/creationEvennement" element={<CreationEvennement />} />
                <Route path="/PageVignerons" element={<PageVignerons />} />
                <Route path="/PagePrestataires" element={<PagePrestataires />} />
                <Route path="/PageSponsors" element={<PageSponsors />} /> {/* Ajouté */}
                <Route path="/PageAnimations" element={<PageAnimations />} /> {/* Ajouté */}
                <Route path="/PageMateriels" element={<PageMateriels />} /> {/* Ajouté */}
                <Route path="/event/:id" element={<EventPage />} />
            </Routes>
        </Router>
    );
}

export default App;
