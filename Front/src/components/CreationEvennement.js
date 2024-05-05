import React from 'react';
import './bootstrap.css'; 
import CheckboxGroup from '../helpers/CheckboxGroup';
import RangeSelector from '../helpers/RangeSelector';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

function CreationEvennement() {
  const [address, setAddress] = React.useState('');

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    console.log(latLng);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Créer un Événement</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="/">Accueil</a>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link">Vignerons</button> {/* Utilisez un bouton si aucune navigation n'est requise */}
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link">Erreur</button> {/* De même ici */}
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-4">
        <h2>Date</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="dateInput1" className="form-label">Date début</label>
            <input type="date" className="form-control" id="dateInput1" />
          </div>
          <div className="mb-3">
            <label htmlFor="dateInput2" className="form-label">Date fin</label>
            <input type="date" className="form-control" id="dateInput2" />
          </div>
          <button type="submit" className="btn btn-primary">Soumettre</button>
        </form>
      </div>

      <div className="container mt-4">
        <h2>Lieu de l'événement</h2>
        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input {...getInputProps({ className: 'form-control', placeholder: 'Recherchez des lieux...' })} />

              <div>
                {loading ? <div>...chargement</div> : null}

                {suggestions.map(suggestion => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                  };

                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
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
    </div>
  );
}
export default CreationEvennement;
