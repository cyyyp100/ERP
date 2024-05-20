import React, { useState, useEffect } from 'react';
import './bootstrap.css'; 
import CheckboxGroup from '../helpers/CheckboxGroup';
import RangeSelector from '../helpers/RangeSelector';


function CreationEvennement() {
  const [vignerons, setVignerons] = useState([]);
  const [VigneronData, setVigneronData] = useState({
      name: '',
      prix: 0,
      cout: 0,
      contact: ''
  });

  const [Prestataires, setPrestataires] = useState([]);
  const [PrestataireData, setPrestataireData] = useState({
      name: '',
      prix: 0,
      cout: 0,
      contact: ''
  });

  const handleVigneronChange = (event) => {
      const { name, value } = event.target;
      setFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  const handlePrestataireChange = (event) => {
      const { name, value } = event.target;
      setPrestataireData(prevState => ({
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
          body: JSON.stringify(VigneronData)
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

  const handlePrestataireSubmit = (event) => {
      event.preventDefault();
      fetch('http://localhost:3001/api/Prestataires', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(PrestataireData)
      })
      .then(response => response.json())
      .then(data => {
          setPrestataires([...Prestataires, data]);
          alert('Food truck ajouté avec succès!');
      })
      .catch(error => {
          console.error('Erreur lors de l’ajout du food truck:', error);
          alert('Erreur lors de l’ajout du food truck');
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

      fetch('http://localhost:3001/api/prestataires')
          .then(response => response.json())
          .then(data => {
              setPrestataires(data);
          })
          .catch(error => {
              console.error('Erreur lors de la récupération des food trucks:', error);
          });
  }, []);

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

    const soumettreForm = () => {
      // Implémentez la logique de soumission du formulaire ici
      console.log('Formulaire soumis');
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
            <form id="questionnaireForm">
      <label htmlFor="besoinSignalétique">Besoin de signalétique :</label><br />
      <input type="radio" id="oui" name="besoinSignalétique" value="Oui" />
      <label htmlFor="oui">Oui</label><br />
      <input type="radio" id="non" name="besoinSignalétique" value="Non" />
      <label htmlFor="non">Non</label><br />

      <label htmlFor="superficie">Superficie (en m²) :</label><br />
      <input type="number" id="superficie" name="superficie" required /><br /><br />

      <button type="button" onClick={soumettreForm}>Soumettre</button>
    </form>          </div>
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
      <form onSubmit={handleVigneronSubmit}>
                Nouveau Vigneron: Nom <input type="text" name="name" onChange={handleVigneronChange} value={VigneronData.name} />
                Contact <input type="text" name="contact" onChange={handleVigneronChange} value={VigneronData.contact} />
                Prix <input type="number" name="prix" onChange={handleVigneronChange} value={VigneronData.prix} min="0" />
                <input type="submit" value="Ajouter Vigneron" />
            </form>

      <div>Prestataires</div>
      <form onSubmit={handlePrestataireSubmit}>
                Nouveau Prestataire: Nom <input type="text" name="name" onChange={handlePrestataireChange} value={PrestataireData.name} />
                Contact <input type="text" name="contact" onChange={handlePrestataireChange} value={PrestataireData.contact} />
                Prix <input type="number" name="prix" onChange={handlePrestataireChange} value={PrestataireData.prix} min="0" />
                <input type="submit" value="Ajouter Prestataire" />
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
    <button type="button" onclick="soumettreForm()">Soumettre</button>
      </form>
    </div>


    </div>
  );
}

export default CreationEvennement;
