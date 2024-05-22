import React, { useState, useEffect } from 'react';
import './bootstrap.css'; 
import CheckboxGroup from '../helpers/CheckboxGroup';
import RangeSelector from '../helpers/RangeSelector';
import CanvasDraw from "react-canvas-draw";

function CreationEvennement() {
    const [vignerons, setVignerons] = useState([]);
    const [eventVignerons, setEventVignerons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [electricite, setElectricite] = useState('');
    const [eau, setEau] = useState('');
    const [proximiteDirecte, setProximiteDirecte] = useState('');

    const [poubelle, setPoubelle] = useState('');
    const [toilette, setToilette] = useState('');
    const [vigneronData, setVigneronData] = useState({
        name: '',
        prix: 0,
        cout: 0,
        contact: ''
    });

    const handleVigneronChange = (event) => {
        const { name, value } = event.target;
        setVigneronData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleVigneronSubmit = (event) => {
      event.preventDefault();
      fetch('http://localhost:3001/api/vignerons', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(vigneronData)  // Corrected this line
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

    const handleVigneronSelect = (vigneronId) => {
        setEventVignerons(prevState => {
            if (prevState.includes(vigneronId)) {
                return prevState.filter(id => id !== vigneronId);
            } else {
                return [...prevState, vigneronId];
            }
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredVignerons = vignerons.filter(vigneron => 
        vigneron.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [formData, setFormData] = useState({
        nom: '',
        dateDebut: '',
        heureDebut: '',
        dateFin: '',
        heureFin: '',
        lieu: '',
        typeLieu: '',
        objectifs: [],
        questionsInterieur: '',
        questionsExterieur: '',
        questionsMixte: '',
        questionsInfrastructures: '',
        materielNecessaire: [{ nom: '', quantite: 1 }],
        materielEnStock: [],
        materielSurSite: []
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                objectifs: checked ? [...prev.objectifs, value] : prev.objectifs.filter(obj => obj !== value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalFormData = {
            ...formData,
            vignerons: eventVignerons
        };
        fetch('http://localhost:3001/api/evenements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalFormData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data received:', data);
            alert('Événement créé avec succès!');
        })
        .catch(error => {
            console.error('Erreur lors de la création de l’événement:', error);
            alert('Erreur lors de la création de l’événement');
        });
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Créer un Événement</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Accueil</a>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link">Vignerons</button>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container">
                <h1>Créer un Événement</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Nom de l'événement</label>
                        <input type="text" name="nom" onChange={handleInputChange} value={formData.nom} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label>Date début</label>
                        <input type="date" name="dateDebut" onChange={handleInputChange} value={formData.dateDebut} className="form-control" />
                        <label>Heure début</label>
                        <input type="time" name="heureDebut" onChange={handleInputChange} value={formData.heureDebut} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label>Date fin</label>
                        <input type="date" name="dateFin" onChange={handleInputChange} value={formData.dateFin} className="form-control" />
                        <label>Heure fin</label>
                        <input type="time" name="heureFin" onChange={handleInputChange} value={formData.heureFin} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label>Lieu de l'événement</label>
                        <input type="text" name="lieu" onChange={handleInputChange} value={formData.lieu} className="form-control" placeholder="Entrez le lieu" />
                    </div>
                    <div className="mb-3">
                        <label>Objectifs de l'événement</label>
                        <div>
                            <input type="checkbox" id="Festif" name="objectifs" value="Festif" onChange={handleInputChange} checked={formData.objectifs.includes('Festif')} />
                            <label htmlFor="Festif">Festif</label>
                            <input type="checkbox" id="Lucratif" name="objectifs" value="Lucratif" onChange={handleInputChange} checked={formData.objectifs.includes('Lucratif')} />
                            <label htmlFor="Lucratif">Lucratif</label>
                        </div>
                    </div>

                    <div className="container mt-4">
                        <CheckboxGroup title="Tranche d'âge cible" checkboxes={[
                            { id: 'age10-18', label: '10-18' },
                            { id: 'age18-30', label: '18-30' },
                            { id: 'age30plus', label: '30+' }
                        ]} />

                        <CheckboxGroup title="Objectif global de l'événement" checkboxes={[
                            { id: 'birthday', label: 'Anniversaire' },
                            { id: 'wedding', label: 'Mariage' },
                            { id: 'other', label: 'Autre' }
                        ]} />
                        
                        <label>Nombre de personnes prévisionnelles</label>
                        <RangeSelector />
                    </div>
                
                    <div className="mb-3">
                        <label>Type de lieu</label>
                        <select name="typeLieu" onChange={handleInputChange} value={formData.typeLieu} className="form-control">
                            <option value="">Choisir...</option>
                            <option value="Interieur">Intérieur</option>
                            <option value="Exterieur">Extérieur</option>
                            <option value="Interieur et Exterieur">Intérieur et Extérieur</option>
                        </select>
                    </div>
                    
                    {formData.typeLieu === 'Interieur' && (
                        <div className="mb-3">
                            <label>Questions pour Intérieur</label>
                            <label htmlFor="besoinSignalétique">Besoin de signalétique :</label><br />
                            <input type="radio" id="oui" name="besoinSignalétique" value="Oui" />
                            <label htmlFor="oui">Oui</label><br />
                            <input type="radio" id="non" name="besoinSignalétique" value="Non" />
                            <label htmlFor="non">Non</label><br />
                            <label htmlFor="superficie">Superficie (en m²) :</label><br />
                            <input type="number" id="superficie" name="superficie" required /><br /><br />
                            <label htmlFor="Nombre_entrées_simples">Nombres d'entrées simples :</label><br />
                            <input type="number" id="nombre_entrées_simples" name="nombres d'entrées simples" required /><br /><br />
                            <label htmlFor="Nombre_entrées_principales">Nombre d'entrées principales :</label><br />
                            <input type="number" id="nombre_entrées_principales" name="nombre d'entrées principales" required /><br /><br />
                            <label>Questions sur les Infrastructures</label>
                        <label>Electricité :</label><br />
    <input type="radio" id="oui" name="Electricité" value="Oui" />
    <label htmlFor="oui">Oui</label><br />
    <input type="radio" id="non" name="Electricité" value="Non" />
    <label htmlFor="non">Non</label><br />


<label htmlFor="electricite">Electricité :</label><br />
<input type="radio" id="electricite-oui" name="electricite" value="Oui" onChange={() => setElectricite('Oui')} />
<label htmlFor="electricite-oui">Oui</label><br />
<input type="radio" id="electricite-non" name="electricite" value="Non" onChange={() => setElectricite('Non')} />
<label htmlFor="electricite-non">Non</label><br />
{electricite === 'Non' && <div className="alert alert-warning">Veuillez vérifier la disponibilité de l'électricité.</div>}
{electricite === 'Oui' && (
  <div>
    <label htmlFor="proximiteDirecte">Proximité directe :</label><br />
    <input type="radio" id="proximiteDirecte-oui" name="proximiteDirecte" value="Oui" onChange={() => setProximiteDirecte('Oui')} />
    <label htmlFor="proximiteDirecte-oui">Oui</label><br />
    <input type="radio" id="proximiteDirecte-non" name="proximiteDirecte" value="Non" onChange={() => setProximiteDirecte('Non')} />
    <label htmlFor="proximiteDirecte-non">Non</label><br />
    {proximiteDirecte === 'Non' && <div className="alert alert-warning">Veuillez vérifier la disponibilité de l'électricité à proximité (Moins de 50 mètres du lieu).</div>}

  </div>
)}

<label htmlFor="eau">Eau :</label><br />
<input type="radio" id="eau-oui" name="eau" value="Oui" onChange={() => setEau('Oui')} />
<label htmlFor="eau-oui">Oui</label><br />
<input type="radio" id="eau-non" name="eau" value="Non" onChange={() => setEau('Non')} />
<label htmlFor="eau-non">Non</label><br />
{eau === 'Non' && <div className="alert alert-warning">Veuillez vérifier la disponibilité de l'eau.</div>}

<label htmlFor="poubelle">Poubelle :</label><br />
<input type="radio" id="poubelle-oui" name="poubelle" value="Oui" onChange={() => setPoubelle('Oui')} />
<label htmlFor="poubelle-oui">Oui</label><br />
<input type="radio" id="poubelle-non" name="poubelle" value="Non" onChange={() => setPoubelle('Non')} />
<label htmlFor="poubelle-non">Non</label><br />
{poubelle === 'Non' && <div className="alert alert-warning">Veuillez vérifier la disponibilité des poubelles.</div>}

<label htmlFor="toilette">Toilette :</label><br />
<input type="radio" id="toilette-oui" name="toilette" value="Oui" onChange={() => setToilette('Oui')} />
<label htmlFor="toilette-oui">Oui</label><br />
<input type="radio" id="toilette-non" name="toilette" value="Non" onChange={() => setToilette('Non')} />
<label htmlFor="toilette-non">Non</label><br />
{toilette === 'Non' && <div className="alert alert-warning">Veuillez vérifier la disponibilité des toilettes.</div>}
                        </div>
                    )}

                    {formData.typeLieu === 'Exterieur' && (
                        <div className="mb-3">
                            <label>Questions pour Extérieur</label>
                            <label htmlFor="besoinSignalétique">Besoin de signalétique :</label><br />
                            <input type="radio" id="oui" name="besoinSignalétique" value="Oui" />
                            <label htmlFor="oui">Oui</label><br />
                            <input type="radio" id="non" name="besoinSignalétique" value="Non" />
                            <label htmlFor="non">Non</label><br />
                            <label htmlFor="Parking">Parking :</label><br />
                            <input type="radio" id="oui" name="Parking" value="Oui" />
                            <label htmlFor="oui">Oui</label><br />
                            <input type="radio" id="non" name="Parking" value="Non" />
                            <label htmlFor="non">Non</label><br />
                            <label htmlFor="Abris">Abris :</label><br />
                            <input type="radio" id="vent" name="Abris" value="Oui" />
                            <label htmlFor="vent">Vent</label><br />
                            <input type="radio" id="pluie" name="Abris" value="Non" />
                            <label htmlFor="pluie">Pluie</label><br />
                            <input type="radio" id="non" name="Abris" value="Non" />
                            <label htmlFor="non">Non</label><br />  
                            <div>Forme</div>
                            <div className="mt-4">
                                <h2>Zone de dessin</h2>
                                <CanvasDraw />
                            </div>

      <label htmlFor="electricite">Electricité :</label><br />
      <input type="radio" id="electricite-oui" name="electricite" value="Oui" onChange={() => setElectricite('Oui')} />
      <label htmlFor="electricite-oui">Oui</label><br />
      <input type="radio" id="electricite-non" name="electricite" value="Non" onChange={() => setElectricite('Non')} />
      <label htmlFor="electricite-non">Non</label><br />
      {electricite === 'Non' && <div className="alert alert-warning">Veuillez vérifier la disponibilité de l'électricité.</div>}
      {electricite === 'Oui' && (
        <div>
          <label htmlFor="proximiteDirecte">Proximité directe :</label><br />
          <input type="radio" id="proximiteDirecte-oui" name="proximiteDirecte" value="Oui" onChange={() => setProximiteDirecte('Oui')} />
          <label htmlFor="proximiteDirecte-oui">Oui</label><br />
          <input type="radio" id="proximiteDirecte-non" name="proximiteDirecte" value="Non" onChange={() => setProximiteDirecte('Non')} />
          <label htmlFor="proximiteDirecte-non">Non</label><br />
        </div>
      )}

      <label htmlFor="eau">Eau :</label><br />
      <input type="radio" id="eau-oui" name="eau" value="Oui" onChange={() => setEau('Oui')} />
      <label htmlFor="eau-oui">Oui</label><br />
      <input type="radio" id="eau-non" name="eau" value="Non" onChange={() => setEau('Non')} />
      <label htmlFor="eau-non">Non</label><br />
      {eau === 'Non' && <div className="alert alert-warning">Veuillez vérifier la disponibilité de l'eau.</div>}

      <label htmlFor="poubelle">Poubelle :</label><br />
      <input type="radio" id="poubelle-oui" name="poubelle" value="Oui" onChange={() => setPoubelle('Oui')} />
      <label htmlFor="poubelle-oui">Oui</label><br />
      <input type="radio" id="poubelle-non" name="poubelle" value="Non" onChange={() => setPoubelle('Non')} />
      <label htmlFor="poubelle-non">Non</label><br />
      {poubelle === 'Non' && <div className="alert alert-warning">Veuillez vérifier la disponibilité des poubelles.</div>}

      <label htmlFor="toilette">Toilette :</label><br />
      <input type="radio" id="toilette-oui" name="toilette" value="Oui" onChange={() => setToilette('Oui')} />
      <label htmlFor="toilette-oui">Oui</label><br />
      <input type="radio" id="toilette-non" name="toilette" value="Non" onChange={() => setToilette('Non')} />
      <label htmlFor="toilette-non">Non</label><br />
      {toilette === 'Non' && <div className="alert alert-warning">Veuillez vérifier la disponibilité des toilettes.</div>}
                        </div>
                    )}
                    
                    {formData.typeLieu === 'Interieur et Exterieur' && (
                        <div className="mb-3">
                            <label>Questions pour Intérieur et Extérieur</label>
                            <input type="text" name="questionsMixte" onChange={handleInputChange} value={formData.questionsMixte} className="form-control" placeholder="Question pour les espaces mixtes?" />

<label htmlFor="electricite">Electricité :</label><br />
<input type="radio" id="electricite-oui" name="electricite" value="Oui" onChange={() => setElectricite('Oui')} />
<label htmlFor="electricite-oui">Oui</label><br />
<input type="radio" id="electricite-non" name="electricite" value="Non" onChange={() => setElectricite('Non')} />
<label htmlFor="electricite-non">Non</label><br />
{electricite === 'Non' && <div className="alert alert-warning">Veuillez vérifier la disponibilité de l'électricité.</div>}
{electricite === 'Oui' && (
  <div>
    <label htmlFor="proximiteDirecte">Proximité directe :</label><br />
    <input type="radio" id="proximiteDirecte-oui" name="proximiteDirecte" value="Oui" onChange={() => setProximiteDirecte('Oui')} />
    <label htmlFor="proximiteDirecte-oui">Oui</label><br />
    <input type="radio" id="proximiteDirecte-non" name="proximiteDirecte" value="Non" onChange={() => setProximiteDirecte('Non')} />
    <label htmlFor="proximiteDirecte-non">Non</label><br />
  </div>
)}

<label htmlFor="eau">Eau :</label><br />
<input type="radio" id="eau-oui" name="eau" value="Oui" onChange={() => setEau('Oui')} />
<label htmlFor="eau-oui">Oui</label><br />
<input type="radio" id="eau-non" name="eau" value="Non" onChange={() => setEau('Non')} />
<label htmlFor="eau-non">Non</label><br />
{eau === 'Non' && <div className="alert alert-warning">Veuillez vérifier la disponibilité de l'eau.</div>}

<label htmlFor="poubelle">Poubelle :</label><br />
<input type="radio" id="poubelle-oui" name="poubelle" value="Oui" onChange={() => setPoubelle('Oui')} />
<label htmlFor="poubelle-oui">Oui</label><br />
<input type="radio" id="poubelle-non" name="poubelle" value="Non" onChange={() => setPoubelle('Non')} />
<label htmlFor="poubelle-non">Non</label><br />
{poubelle === 'Non' && <div className="alert alert-warning">Veuillez vérifier la disponibilité des poubelles.</div>}

<label htmlFor="toilette">Toilette :</label><br />
<input type="radio" id="toilette-oui" name="toilette" value="Oui" onChange={() => setToilette('Oui')} />
<label htmlFor="toilette-oui">Oui</label><br />
<input type="radio" id="toilette-non" name="toilette" value="Non" onChange={() => setToilette('Non')} />
<label htmlFor="toilette-non">Non</label><br />
{toilette === 'Non' && <div className="alert alert-warning">Veuillez vérifier la disponibilité des toilettes.</div>}
                        </div>
                    )}

                    <div className="container mt-4">
                        <h1>Organisation personnel</h1>
                        <div>Vigneron</div>
                        <form onSubmit={handleVigneronSubmit}>
                            Nouveau Vigneron: Nom 
                            <input type="text" name="name" onChange={handleVigneronChange} value={vigneronData.name} />
                            Contact 
                            <input type="text" name="contact" onChange={handleVigneronChange} value={vigneronData.contact} />
                            Prix 
                            <input type="number" name="prix" onChange={handleVigneronChange} value={vigneronData.prix} min="0" />
                            Coût 
                            <input type="number" name="cout" onChange={handleVigneronChange} value={vigneronData.cout} min="0" />
                            <input type="submit" value="Ajouter Vigneron" />
                        </form>
                        <div>
                            <h2>Liste des Vignerons</h2>
                            <input
                                type="text"
                                placeholder="Rechercher par nom"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="form-control mb-3"
                            />
                            <ul>
                                {filteredVignerons.map(vigneron => (
                                    <li key={vigneron.id}>
                                        <input
                                            type="checkbox"
                                            checked={eventVignerons.includes(vigneron.id)}
                                            onChange={() => handleVigneronSelect(vigneron.id)}
                                        />
                                        {vigneron.name} - {vigneron.contact} - {vigneron.prix}€ - {vigneron.cout}€
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <button type="submit">Soumettre</button>
                </form>
            </div>
        </div>
    );
}

export default CreationEvennement;
