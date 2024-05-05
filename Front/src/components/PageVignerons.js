import React, { useState, useEffect } from 'react';

function PageVigneron() {
    const [vignerons, setVignerons] = useState([]); // État pour conserver les données des vignerons

    useEffect(() => {
        // Faire une requête GET pour récupérer les données des vignerons
        fetch('http://localhost:3001/api/vignerons') // Modifiez cette URL selon votre configuration API
            .then(response => response.json())
            .then(data => {
                setVignerons(data); // Stocker les données dans l'état
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des vignerons:', error);
            });
    }, []); // Le tableau vide garantit que l'effet s'exécute une seule fois après le premier rendu

    return (
        <div>
            <h1>Liste des Vignerons</h1>
            {vignerons.length > 0 ? (
                vignerons.map(vigneron => (
                    <div key={vigneron.id}>
                        <h2>{vigneron.name}</h2>
                        <p>Prix: {vigneron.prix} €</p>
                        <p>Coût: {vigneron.cout} €</p>
                        <p>Contact: {vigneron.contact}</p>
                    </div>
                ))
            ) : (
                <p>Aucun vigneron à afficher</p>
            )}
        </div>
    );
}

export default PageVigneron;
