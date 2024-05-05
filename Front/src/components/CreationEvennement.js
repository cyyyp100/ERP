import React, { useState } from 'react';
import './bootstrap.css'; 
import CheckboxGroup from '../helpers/CheckboxGroup';
import RangeSelector from '../helpers/RangeSelector';

function CreationEvennement() {
  const [selectedOption, setSelectedOption] = useState(''); // Ensure this is defined

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const [formData, setFormData] = useState({
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
        console.log(formData);
        alert('Formulaire soumis, vérifiez la console pour les données.');
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

      <div className="container">
      <h1>Créer un Événement</h1>
      <form onSubmit={handleSubmit}>
        {/* Les inputs de base pour l'événement */}
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
            {/* Ajoutez plus de checkboxes selon vos objectifs */}
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

<label>Nombre de personnes previsionnal</label>
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
            <input type="text" name="questionsInterieur" onChange={handleChange} value={formData.questionsInterieur} className="form-control" placeholder="Question pour les espaces intérieurs?" />
          </div>
        )}
        {formData.typeLieu === 'Exterieur' && (
          <div className="mb-3">
            <label>Questions pour Extérieur</label>
            <input type="text" name="questionsExterieur" onChange={handleChange} value={formData.questionsExterieur} className="form-control" placeholder="Question pour les espaces extérieurs?" />
          </div>
        )}
        {formData.typeLieu === 'Interieur et Exterieur' && (
          <div className="mb-3">
            <label>Questions pour Intérieur et Extérieur</label>
            <input type="text" name="questionsMixte" onChange={handleChange} value={formData.questionsMixte} className="form-control" placeholder="Question pour les espaces mixtes?" />
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
        <button type="submit" className="btn btn-primary">Soumettre</button>
      </form>
    </div>
    </div>
  );
}

export default CreationEvennement;
