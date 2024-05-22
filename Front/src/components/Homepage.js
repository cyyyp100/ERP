import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Link } from 'react-router-dom';

function HomePage() {
    const [evenements, setEvenements] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/evenements')
        .then(response => response.json())
        .then(data => {
            console.log('Data received:', data); 
            setEvenements(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Accueil</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/creationEvennement">Créer un Événement</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Identification</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/PageVignerons">Vignerons</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/PagePrestataires">Prestataire</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/PageAnimations">Animations</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/PageSponsors">Sponsors</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/PageMateriels">Matériels</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                evenements={evenements.map(event => ({
                    id: event.id,
                    title: event.lieu,
                    start: event.dateDebut,
                    end: event.dateFin
                }))}
                locale="fr"
                eventContent={renderEventContent} 
            />
            <h2>Liste des Événements</h2>
            {evenements.length > 0 ? (
                evenements.map(evt => (
                    <div key={evt.id}>
                        <h2>{evt.nom}</h2>
                        <p>Type de Lieu: {evt.typeLieu}</p>
                        <p>Date Début: {new Date(evt.dateDebut).toLocaleDateString()}</p>
                        <p>Date Fin: {new Date(evt.dateFin).toLocaleDateString()}</p>
                        <p>Objectifs: {evt.objectifs}</p>
                        <p>Vignerons: {evt.vignerons}</p>
                        <Link className="nav-link" to={`/event/${evt.id}`}>Voir Evennement</Link>

                    </div>
                ))
            ) : (
                <p>Aucun événement à afficher</p>
            )}
        </div>
    );

    function renderEventContent(eventInfo) {
        return (
            <div>
                <Link to={`/event/${eventInfo.event.id}`}>{eventInfo.event.title}</Link>
                {/* Vous pouvez ajouter plus de détails ici si nécessaire */}
            </div>
        );
    }
}

export default HomePage;
