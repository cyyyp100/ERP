// /mnt/data/PageSponsors.js

import React, { useState, useEffect } from 'react';

function PageSponsors() {
    const [sponsors, setSponsors] = useState([]);
    const [selectedSponsors, setSelectedSponsors] = useState({});
    const [editForm, setEditForm] = useState({ visible: false, data: {} });
    const [addForm, setAddForm] = useState({ visible: false, data: { name: '', contact: '' } });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchSponsors();
    }, []);

    const fetchSponsors = (search = '') => {
        const url = `http://localhost:3001/api/sponsors${search ? `?name=${search}` : ''}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setSponsors(data);
                setSelectedSponsors({});
            })
            .catch(error => console.error('Erreur lors de la récupération des sponsors:', error));
    };

    const handleCheckboxChange = (id) => {
        setSelectedSponsors(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleDelete = () => {
        Object.keys(selectedSponsors).forEach(id => {
            if (selectedSponsors[id]) {
                fetch(`http://localhost:3001/api/sponsors/${id}`, { method: 'DELETE' })
                    .then(() => fetchSponsors()) // Refresh list after deletion
                    .catch(error => console.error('Erreur lors de la suppression du sponsor:', error));
            }
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        fetchSponsors(searchTerm);
    };

    const showEditForm = (sponsor) => {
        setEditForm({ visible: true, data: sponsor });
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
        const { id, name, contact } = editForm.data;
        fetch(`http://localhost:3001/api/sponsors/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, contact })
        })
        .then(() => {
            fetchSponsors(); // Refresh list after update
            setEditForm({ visible: false, data: {} });
        })
        .catch(error => console.error('Erreur lors de la modification du sponsor:', error));
    };

    const showAddForm = () => {
        setAddForm({ visible: true, data: { name: '', contact: '' } });
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
        const { name, contact } = addForm.data;
        fetch('http://localhost:3001/api/sponsors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, contact })
        })
        .then(() => {
            fetchSponsors(); // Refresh list after adding new sponsor
            setAddForm({ visible: false, data: {} });
        })
        .catch(error => console.error('Erreur lors de l\'ajout du sponsor:', error));
    };

    return (
        <div>
            <h1>Liste des Sponsors</h1>
            <input
                type="text"
                placeholder="Rechercher par nom"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button onClick={handleSearch}>Rechercher</button>
            <button onClick={showAddForm}>Ajouter un Sponsor</button>
            {addForm.visible && (
                <form onSubmit={handleAddSubmit}>
                    Nom: <input type="text" name="name" value={addForm.data.name} onChange={handleAddChange} />
                    Contact: <input type="text" name="contact" value={addForm.data.contact} onChange={handleAddChange} />
                    <button type="submit">Ajouter</button>
                </form>
            )}
            {sponsors.filter(sponsor => sponsor.name.toLowerCase().includes(searchTerm.toLowerCase())).map(sponsor => (
                <div key={sponsor.id}>
                    <input
                        type="checkbox"
                        checked={!!selectedSponsors[sponsor.id]}
                        onChange={() => handleCheckboxChange(sponsor.id)}
                    />
                    {sponsor.name} - Contact: {sponsor.contact}
                    {selectedSponsors[sponsor.id] && (
                        <>
                            <button onClick={() => showEditForm(sponsor)}>Modifier</button>
                            <button onClick={handleDelete}>Supprimer</button>
                        </>
                    )}
                    {editForm.visible && editForm.data.id === sponsor.id && (
                        <form onSubmit={handleEditSubmit}>
                            Nom: <input type="text" name="name" value={editForm.data.name} onChange={handleEditChange} />
                            Contact: <input type="text" name="contact" value={editForm.data.contact} onChange={handleEditChange} />
                            <button type="submit">Enregistrer les modifications</button>
                        </form>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PageSponsors;
