import React, { useState } from 'react';
import './bootstrap.css'; 
import CheckboxGroup from '../helpers/CheckboxGroup';
import RangeSelector from '../helpers/RangeSelector';

function CreationEvennement() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [formData, setFormData] = useState({
    nom: '',
    dateDebut: '',
    heureDebut: '',
    dateFin: '',
    heureFin: '',
    lieu: '',
    objectifs: [],
    typeLieu: '',  // Ajouté un état pour le type de lieu si nécessaire
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevState => {
      const newObjectifs = checked
        ? [...prevState.objectifs, name]
        : prevState.objectifs.filter(obj => obj !== name);
      return { ...prevState, objectifs: newObjectifs };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/evenements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert('Événement créé avec succès !');
      } else {
        throw new Error('Réponse du réseau non ok.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire', error);
      alert('Erreur lors de la création de l\'événement.');
    }
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
            <li className="nav-item">
              <button className="nav-link btn btn-link">Erreur</button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-4">
        <h2>Date et Heure de l'événement</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="dateInput1" className="form-label">Date début</label>
            <input type="date" className="form-control" id="dateInput1" />
            <label htmlFor="timeInput1" className="form-label">Heure début</label>
            <input type="time" className="form-control" id="timeInput1" />
          </div>
          <div className="mb-3">
            <label htmlFor="dateInput2" className="form-label">Date fin</label>
            <input type="date" className="form-control" id="dateInput2" />
            <label htmlFor="timeInput2" className="form-label">Heure fin</label>
            <input type="time" className="form-control" id="timeInput2" />
          </div>

          <div className="mb-3">
            <label htmlFor="locationInput" className="form-label">Lieu de l'événement</label>
            <input type="text" className="form-control" id="locationInput" placeholder="Entrez le lieu" />
          </div>

          <button type="submit" className="btn btn-primary">Soumettre</button>
        </form>
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

        <RangeSelector />
      </div>
      
      <div className="container mt-4">
      <h2>Type de lieu</h2>
        <input type="checkbox" id="option1" name="option1" value="option1" onChange={handleChange} checked={selectedOption === 'option1'} />
        <label htmlFor="option1">Intérieur</label>
      </div>
      <div className="container mt-4">
        <input type="checkbox" id="option2" name="option2" value="option2" onChange={handleChange} checked={selectedOption === 'option2'} />
        <label htmlFor="option2">Extérieur</label>
      </div>
      <div className="container mt-4">
        <input type="checkbox" id="option3" name="option3" value="option3" onChange={handleChange} checked={selectedOption === 'option3'} />
        <label htmlFor="option3">Intérieur et Extérieur</label>
      </div>

      {selectedOption === 'option1' && (
        <div className="container mt-4">
          <h2>Questionnaire for Option 1</h2>
          <p>Question 1 for Option 1?</p>
          <input type="text" placeholder="Answer 1" />
        </div>
      )}
      {selectedOption === 'option2' && (
        <div className="container mt-4">
          <h2>Questionnaire for Option 2</h2>
          <p>Question 1 for Option 2?</p>
          <input type="text" placeholder="Answer 1" />
        </div>
      )}
      {selectedOption === 'option3' && (
        <div className="container mt-4">
          <h2>Questionnaire for Option 3</h2>
          <p>Question 1 for Option 3?</p>
          <input type="text" placeholder="Answer 1" />
        </div>
      )}
      <div className="container mt-4">
      <h1>Organisation personnel</h1>

      <div>Vigneron</div>
      <form method="get" action="./controle">
        Nouveau Vigneron: Nom <input type="text" name="nom_vigneron" />
        Contact <input type="text" name="contact_vigneron" />
        Prix <input type="number" name="prix" id="prix_vigneron" min="0" />
        <input type="submit" name="action" value="addVigneron" />
      </form>

      <div>Prestataires</div>
      <form method="get" action="./controle">
        Nouveau Prestataire : Nom :<input type="text" name="nom_prestataire" />
        Contact : <input type="text" name="contact_prestataire" />
        Prix :<input type="number" name="prix" id="prix_prestataire" min="0" />
        <input type="submit" name="action" value="addPrestataire" />
      </form>

      <div>Sponsors</div>
      <form method="get" action="./controle">
        Nouveau Sponsor: Nom <input type="text" name="nom_sponsor" />
        Contact : <input type="text" name="contact_sponsor" />
        Prix :<input type="number" name="prix" id="prix_sponsor" min="0" />
        <input type="submit" name="action" value="addSponsor" />
      </form>

      <div>Animations</div>
      <form method="get" action="./controle">
        Nouvelle Animation: Nom <input type="text" name="nom_animation" />
        Contact <input type="text" name="contact_animation" />
        Prix <input type="number" name="prix" id="prix_animation" min="0" />
        <input type="submit" name="action" value="addAnimation" />
      </form>
    </div>
    </div>
  );
}

export default CreationEvennement;
