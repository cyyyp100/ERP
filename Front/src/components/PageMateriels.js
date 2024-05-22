// /mnt/data/PageMateriel.js

import React, { useState, useEffect } from 'react';

function PageMateriel() {
    const [materiels, setMateriels] = useState([]);
    const [selectedMateriels, setSelectedMateriels] = useState({});
    const [editForm, setEditForm] = useState({ visible: false, data: {} });
    const [addForm, setAddForm] = useState({ visible: false, data: { name: '', quantite_necessaire: '', quantite_en_stock: '', quantite_sur_place: '', contact_location: '' } });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchMateriels();
    }, []);

    const fetchMateriels = (search = '') => {
        const url = `http://localhost:3001/api/materiel${search ? `?name=${search}` : ''}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setMateriels(data);
                setSelectedMateriels({});
            })
            .catch(error => console.error('Erreur lors de la récupération des matériels:', error));
    };

    const handleCheckboxChange = (id) => {
        setSelectedMateriels(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleDelete = () => {
        Object.keys(selectedMateriels).forEach(id => {
            if (selectedMateriels[id]) {
                fetch(`http://localhost:3001/api/materiel/${id}`, { method: 'DELETE' })
                    .then(() => fetchMateriels()) // Refresh list after deletion
                    .catch(error => console.error('Erreur lors de la suppression du matériel:', error));
            }
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        fetchMateriels(searchTerm);
    };

    const showEditForm = (materiel) => {
        setEditForm({ visible: true, data: materiel });
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
        const { id, name, quantite_necessaire, quantite_en_stock, quantite_sur_place, contact_location } = editForm.data;
        fetch(`http://localhost:3001/api/materiel/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, quantite_necessaire, quantite_en_stock, quantite_sur_place, contact_location })
        })
        .then(() => {
            fetchMateriels(); // Refresh list after update
            setEditForm({ visible: false, data: {} });
        })
        .catch(error => console.error('Erreur lors de la modification du matériel:', error));
    };

    const showAddForm = () => {
        setAddForm({ visible: true, data: { name: '', quantite_necessaire: '', quantite_en_stock: '', quantite_sur_place: '', contact_location: '' } });
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
        const { name, quantite_necessaire, quantite_en_stock, quantite_sur_place, contact_location } = addForm.data;
        fetch('http://localhost:3001/api/materiel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, quantite_necessaire, quantite_en_stock, quantite_sur_place, contact_location })
        })
        .then(() => {
            fetchMateriels(); // Refresh list after adding new materiel
            setAddForm({ visible: false, data: {} });
        })
        .catch(error => console.error('Erreur lors de l\'ajout du matériel:', error));
    };

    return (
        <div>
            <h1>Liste des Matériels</h1>
            <input
                type="text"
                placeholder="Rechercher par nom"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button onClick={handleSearch}>Rechercher</button>
            <button onClick={showAddForm}>Ajouter un Matériel</button>
            {addForm.visible && (
                <form onSubmit={handleAddSubmit}>
                    Nom: <input type="text" name="name" value={addForm.data.name} onChange={handleAddChange} />
                    Quantité nécessaire: <input type="number" name="quantite_necessaire" value={addForm.data.quantite_necessaire} onChange={handleAddChange} />
                    En stock: <input type="number" name="quantite_en_stock" value={addForm.data.quantite_en_stock} onChange={handleAddChange} />
                    Sur place: <input type="number" name="quantite_sur_place" value={addForm.data.quantite_sur_place} onChange={handleAddChange} />
                    Contact: <input type="text" name="contact_location" value={addForm.data.contact_location} onChange={handleAddChange} />
                    <button type="submit">Ajouter</button>
                </form>
            )}
            {materiels.filter(materiel => materiel.name.toLowerCase().includes(searchTerm.toLowerCase())).map(materiel => (
                <div key={materiel.id}>
                    <input
                        type="checkbox"
                        checked={!!selectedMateriels[materiel.id]}
                        onChange={() => handleCheckboxChange(materiel.id)}
                    />
                    {materiel.name} - Quantité nécessaire: {materiel.quantite_necessaire}, En stock: {materiel.quantite_en_stock}, Sur place: {materiel.quantite_sur_place}, Contact: {materiel.contact_location}
                    {selectedMateriels[materiel.id] && (
                        <>
                            <button onClick={() => showEditForm(materiel)}>Modifier</button>
                            <button onClick={handleDelete}>Supprimer</button>
                        </>
                    )}
                    {editForm.visible && editForm.data.id === materiel.id && (
                        <form onSubmit={handleEditSubmit}>
                            Nom: <input type="text" name="name" value={editForm.data.name} onChange={handleEditChange} />
                            Quantité nécessaire: <input type="number" name="quantite_necessaire" value={editForm.data.quantite_necessaire} onChange={handleEditChange} />
                            En stock: <input type="number" name="quantite_en_stock" value={editForm.data.quantite_en_stock} onChange={handleEditChange} />
                            Sur place: <input type="number" name="quantite_sur_place" value={editForm.data.quantite_sur_place} onChange={handleEditChange} />
                            Contact: <input type="text" name="contact_location" value={editForm.data.contact_location} onChange={handleEditChange} />
                            <button type="submit">Enregistrer les modifications</button>
                        </form>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PageMateriel;
