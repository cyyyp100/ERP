import React, { useState, useEffect } from 'react';

function HomePage() {
    const [evenements, setEvenements] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/evenements')
        .then(response => response.json())
        .then(data => {
            console.log('Data received:', data); // Assurez-vous que cette ligne affiche les données
            setEvenements(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href=".\">accueil</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href=".\CreationEvennement">CreationEvennement</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Ta mère</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href=".\login">Identification</a>
            </li>
          </ul>
        </div>
      </nav>
        <h2>Liste des Événements</h2>
            {evenements.length > 0 ? (
                evenements.map(evt => (
                    <div key={evt.id}>
                        <h2>{evt.name}</h2>
                        <p>Lieu: {evt.lieu}</p>
                        <p>Objectifs: {evt.Objectif_de_l_evenement.join(', ')}</p>
                        <p>Date: {new Date(evt.created).toLocaleDateString()}</p>
                    </div>
                ))
            ) : (
                <p>Aucun événement à afficher</p>
            )}
        </div>
    );
}

export default HomePage;
