import React, { useState, useEffect } from 'react';

function PageVigneron() {
    const [vignerons, setVignerons] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        prix: 0,
        cout: 0,
        contact: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3001/api/vignerons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            setVignerons([...vignerons, data]);
            alert('Vigneron ajouté avec succès!');
        })
        .catch(error => {
            console.error('Erreur lors de l’ajout du vigneron:', error);
            alert('Erreur lors de l’ajout du vigneron');
        });
    };

    useEffect(() => {
        fetch('http://localhost:3001/api/vignerons')
            .then(response => response.json())
            .then(data => {
                setVignerons(data); 
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des vignerons:', error);
            });
    }, []);

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

            <form onSubmit={handleSubmit}>
                Nouveau Vigneron: Nom <input type="text" name="name" onChange={handleInputChange} value={formData.name} />
                Contact <input type="text" name="contact" onChange={handleInputChange} value={formData.contact} />
                Prix <input type="number" name="prix" onChange={handleInputChange} value={formData.prix} min="0" />
                Coût <input type="number" name="cout" onChange={handleInputChange} value={formData.cout} min="0" />
                <input type="submit" value="Ajouter Vigneron" />
            </form>
        </div>
    );
}

export default PageVigneron;
