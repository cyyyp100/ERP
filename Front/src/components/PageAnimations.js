// /mnt/data/PageAnimations.js

import React, { useState, useEffect } from 'react';

function PageAnimations() {
    const [animations, setAnimations] = useState([]);
    const [selectedAnimations, setSelectedAnimations] = useState({});
    const [editForm, setEditForm] = useState({ visible: false, data: {} });
    const [addForm, setAddForm] = useState({ visible: false, data: { name: '', prix: '', cout: '', contact: '' } });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAnimations();
    }, []);

    const fetchAnimations = (search = '') => {
        const url = `http://localhost:3001/api/animations${search ? `?name=${search}` : ''}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setAnimations(data);
                setSelectedAnimations({});
            })
            .catch(error => console.error('Erreur lors de la récupération des animations:', error));
    };

    const handleCheckboxChange = (id) => {
        setSelectedAnimations(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleDelete = () => {
        Object.keys(selectedAnimations).forEach(id => {
            if (selectedAnimations[id]) {
                fetch(`http://localhost:3001/api/animations/${id}`, { method: 'DELETE' })
                    .then(() => fetchAnimations()) // Refresh list after deletion
                    .catch(error => console.error('Erreur lors de la suppression de l’animation:', error));
            }
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        fetchAnimations(searchTerm);
    };

    const showEditForm = (animation) => {
        setEditForm({ visible: true, data: animation });
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditForm(prev => ({
            ...prev,
            data: { ...prev.data, [name]: value }
        }));
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();
        const { id, name, prix, cout, contact } = editForm.data;
        fetch(`http://localhost:3001/api/animations/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, prix, cout, contact })
        })
        .then(() => {
            fetchAnimations(); // Refresh list after update
            setEditForm({ visible: false, data: {} });
        })
        .catch(error => console.error('Erreur lors de la modification de l’animation:', error));
    };

    const showAddForm = () => {
        setAddForm({ visible: true, data: { name: '', prix: '', cout: '', contact: '' } });
    };

    const handleAddChange = (event) => {
        const { name, value } = event.target;
        setAddForm(prev => ({
            ...prev,
            data: { ...prev.data, [name]: value }
        }));
    };

    const handleAddSubmit = (event) => {
        event.preventDefault();
        const { name, prix, cout, contact } = addForm.data;
        fetch('http://localhost:3001/api/animations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, prix, cout, contact })
        })
        .then(() => {
            fetchAnimations(); // Refresh list after adding new animation
            setAddForm({ visible: false, data: {} });
        })
        .catch(error => console.error('Erreur lors de l\'ajout de l\'animation:', error));
    };

    return (
        <div>
            <h1>Liste des Animations</h1>
            <input
                type="text"
                placeholder="Rechercher par nom"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button onClick={handleSearch}>Rechercher</button>
            <button onClick={showAddForm}>Ajouter une Animation</button>
            {addForm.visible && (
                <form onSubmit={handleAddSubmit}>
                    Nom: <input type="text" name="name" value={addForm.data.name} onChange={handleAddChange} />
                    Prix: <input type="number" name="prix" value={addForm.data.prix} onChange={handleAddChange} />
                    Coût: <input type="number" name="cout" value={addForm.data.cout} onChange={handleAddChange} />
                    Contact: <input type="text" name="contact" value={addForm.data.contact} onChange={handleAddChange} />
                    <button type="submit">Ajouter</button>
                </form>
            )}
            {animations.filter(animation => animation.name.toLowerCase().includes(searchTerm.toLowerCase())).map(animation => (
                <div key={animation.id}>
                    <input
                        type="checkbox"
                        checked={!!selectedAnimations[animation.id]}
                        onChange={() => handleCheckboxChange(animation.id)}
                    />
                    {animation.name} - Prix: {animation.prix} €, Coût: {animation.cout} €, Contact: {animation.contact}
                    {selectedAnimations[animation.id] && (
                        <>
                            <button onClick={() => showEditForm(animation)}>Modifier</button>
                            <button onClick={handleDelete}>Supprimer</button>
                        </>
                    )}
                    {editForm.visible && editForm.data.id === animation.id && (
                        <form onSubmit={handleEditSubmit}>
                            Nom: <input type="text" name="name" value={editForm.data.name} onChange={handleEditChange} />
                            Prix: <input type="number" name="prix" value={editForm.data.prix} onChange={handleEditChange} />
                            Coût: <input type="number" name="cout" value={editForm.data.cout} onChange={handleEditChange} />
                            Contact: <input type="text" name="contact" value={editForm.data.contact} onChange={handleEditChange} />
                            <button type="submit">Enregistrer les modifications</button>
                        </form>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PageAnimations;
