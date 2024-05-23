import React, { useState, useEffect, useCallback, useRef } from 'react';
import './bootstrap.css'; 
import CheckboxGroup from '../helpers/CheckboxGroup';
import RangeSelector from '../helpers/RangeSelector';
import CanvasDraw from "react-canvas-draw";

function CreationEvennement() {
    const [vignerons, setVignerons] = useState([]);
    const [prestataires, setPrestataires] = useState([]);
    const [animations, setAnimations] = useState([]);
    const [sponsors, setSponsors] = useState([]);
    const [eventVignerons, setEventVignerons] = useState([]);
    const [searchTermVignerons, setSearchTermVignerons] = useState('');
    const [searchTermPrestataires, setSearchTermPrestataires] = useState('');
    const [searchTermAnimations, setSearchTermAnimations] = useState('');
    const [searchTermSponsors, setSearchTermSponsors] = useState('');

    const [electricite, setElectricite] = useState('');
    const [eau, setEau] = useState('');
    const [proximiteDirecte, setProximiteDirecte] = useState('');
    const [poubelle, setPoubelle] = useState('');
    const [toilette, setToilette] = useState('');
    const [navette, setNavette] = useState('');

    const orgPersonnelRef = useRef(null);



    const [vigneronData, setVigneronData] = useState({
        name: '',
        prix: 0,
        cout: 0,
        contact: ''
    });
    const [prestataireData, setPrestataireData] = useState({ name: '', contact: '', prix: 0, cout: 0 });
    const [animationData, setAnimationData] = useState({ name: '', contact: '', prix: 0, cout: 0 });
    const [sponsorData, setSponsorData] = useState({ name: '', contact: '', prix: 0, cout: 0 });

    const [eventPrestataires, setEventPrestataires] = useState([]);
    const [eventAnimations, setEventAnimations] = useState([]);
    const [eventSponsors, setEventSponsors] = useState([]);
    const [file, setFile] = useState(null);

// Gestionnaire de changement de fichier
const handleFileChange = (event) => {
    setFile(event.target.files[0]);
};

// Gestionnaire de téléchargement de fichier
const handleFileUpload = () => {
    if (!file) {
        alert('Veuillez sélectionner un fichier avant de l\'envoyer.');
        return;
    }
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Fichier téléchargé avec succès!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Erreur lors du téléchargement du fichier.');
    });
};

    const handleVigneronChange = (event) => {
        const { name, value } = event.target;
        setVigneronData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleVigneronSubmit = async (event) => {
        event.preventDefault();
        const { name, prix, cout, contact } = vigneronData;

        try {
            const response = await fetch('http://localhost:3001/api/vignerons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, prix, cout, contact })
            });

            if (response.ok) {
                const newVigneron = await response.json();
                setVignerons(prevVignerons => [...prevVignerons, newVigneron]);
                setVigneronData({ name: '', prix: 0, cout: 0, contact: '' });
                alert('Vigneron ajouté avec succès!');
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout du vigneron:', error);
        }
    };
    
    
    // Fetch function to refresh the vignerons list
    const fetchVignerons = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3001/api/vignerons');
            const data = await response.json();
            setVignerons(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des vignerons:', error);
        }
    }, []);
    

    const fetchPrestataires = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3001/api/prestataires');
            const data = await response.json();
            setPrestataires(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des prestataires:', error);
        }
    }, []);

    const fetchAnimations = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3001/api/animations');
            const data = await response.json();
            setAnimations(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des animations:', error);
        }
    }, []);

    const fetchSponsors = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3001/api/sponsors');
            const data = await response.json();
            setSponsors(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des sponsors:', error);
        }
    }, []);
    
    // const fetchMateriels = async () => {
    //     try {
    //         const response = await fetch('http://localhost:3001/api/materiels');
    //         const data = await response.json();
    //         setMateriels(data);
    //     } catch (error) {
    //         console.error('Erreur lors de la récupération des matériels:', error);
    //     }
    // };
    
    // useEffect to load initial data
    useEffect(() => {
        // Fetch data functions
        const fetchVignerons = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/vignerons');
                const data = await response.json();
                setVignerons(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des vignerons:', error);
            }
        };

        const fetchPrestataires = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/prestataires');
                const data = await response.json();
                setPrestataires(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des prestataires:', error);
            }
        };

        const fetchAnimations = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/animations');
                const data = await response.json();
                setAnimations(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des animations:', error);
            }
        };

        const fetchSponsors = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/sponsors');
                const data = await response.json();
                setSponsors(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des sponsors:', error);
            }
        };

        fetchVignerons();
        fetchPrestataires();
        fetchAnimations();
        fetchSponsors();

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    alert('Vous êtes arrivé à la section Organisation personnel. Veuillez vous assurer que les contrats soient signés avec les personnes extérieures');
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 1.0
        });

        if (orgPersonnelRef.current) {
            observer.observe(orgPersonnelRef.current);
        }

        return () => {
            observer.disconnect();
        };
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

    const handleSearchChangeVignerons = (event) => {
        setSearchTermVignerons(event.target.value);
    };
    
    const handleSearchChangePrestataires = (event) => {
        setSearchTermPrestataires(event.target.value);
    };
    
    const handleSearchChangeAnimations = (event) => {
        setSearchTermAnimations(event.target.value);
    };
    
    const handleSearchChangeSponsors = (event) => {
        setSearchTermSponsors(event.target.value);
    };
    

    const filteredVignerons = vignerons.filter(vigneron =>
        vigneron.name.toLowerCase().includes(searchTermVignerons.toLowerCase())
    );
    
    const filteredPrestataires = prestataires.filter(prestataire =>
        prestataire.name.toLowerCase().includes(searchTermPrestataires.toLowerCase())
    );
    
    const filteredAnimations = animations.filter(animation =>
        animation.name.toLowerCase().includes(searchTermAnimations.toLowerCase())
    );
    
    const filteredSponsors = sponsors.filter(sponsor =>
        sponsor.name.toLowerCase().includes(searchTermSponsors.toLowerCase())
    );
    

    const handlePrestataireChange = (event) => {
        const { name, value } = event.target;
        setPrestataireData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePrestataireSubmit = async (event) => {
        event.preventDefault();
        const { name, prix, cout, contact } = prestataireData;
    
        fetch('http://localhost:3001/api/prestataires', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Cache-Control': 'no-cache' },
            body: JSON.stringify({ name, prix, cout, contact })
        })
        .then(() => {
            fetchPrestataires(); // Refresh list after adding new prestataire
            setPrestataireData({ name: '', prix: 0, cout: 0, contact: '' }); // Reset form fields
            alert('Prestataire ajouté avec succès!');
        })
        .catch(error => console.error('Erreur lors de l\'ajout du prestataire:', error));
    };

    const handleAnimationChange = (event) => {
        const { name, value } = event.target;
        setAnimationData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAnimationSubmit = async (event) => {
        event.preventDefault();
        const { name, prix, cout, contact } = animationData;

        try {
            const response = await fetch('http://localhost:3001/api/animations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, prix, cout, contact })
            });

            if (response.ok) {
                const newAnimation = await response.json();
                setAnimations(prevAnimations => [...prevAnimations, newAnimation]);
                setAnimationData({ name: '', prix: 0, cout: 0, contact: '' });
                alert('Animation ajoutée avec succès!');
            }
        } catch (error) {
            console.error('Erreur lors de l ajout de l animation:', error);
        }
    };

    const handleSponsorChange = (event) => {
        const { name, value } = event.target;
        setSponsorData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSponsorSubmit = async (event) => {
        event.preventDefault();
        const { name, prix, cout, contact } = sponsorData;

        try {
            const response = await fetch('http://localhost:3001/api/sponsors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, prix, cout, contact })
            });

            if (response.ok) {
                const newSponsor = await response.json();
                setSponsors(prevSponsors => [...prevSponsors, newSponsor]);
                setSponsorData({ name: '', prix: 0, cout: 0, contact: '' });
                alert('Sponsor ajouté avec succès!');
            }
        } catch (error) {
            console.error('Erreur lors de l ajout du sponsor:', error);
        }
    };

    const handlePrestataireSelect = (prestataireId) => {
        setEventPrestataires(prevState => {
            if (prevState.includes(prestataireId)) {
                return prevState.filter(id => id !== prestataireId);
            } else {
                return [...prevState, prestataireId];
            }
        });
    };

    const handleAnimationSelect = (animationId) => {
        setEventAnimations(prevState => {
            if (prevState.includes(animationId)) {
                return prevState.filter(id => id !== animationId);
            } else {
                return [...prevState, animationId];
            }
        });
    };

    const handleSponsorSelect = (sponsorId) => {
        setEventSponsors(prevState => {
            if (prevState.includes(sponsorId)) {
                return prevState.filter(id => id !== sponsorId);
            } else {
                return [...prevState, sponsorId];
            }
        });
    };

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
        questionsInterieur: {
            besoinSignaletique: '',
            superficie: '',
            nombresEntreesSimples: '',
            nombreEntreesPrincipales: '',
            forme: '',
            chauffage: '',
            coinFumeur: '',
            coinTraiteur: '',
            batimentERP: '',
        },
        questionsExterieur: {
            electricite: '',
            eau: '',
            poubelle: '',
            toilette: '',
            abris: '',
            vegetation: '',
            typeDeSol: ''
        },
        questionsMixte: {
            
            electricite: '',
            eau: '',
            poubelle: '',
            toilette: '',
            abris: '',
            vegetation: '',
            typeDeSol: ''
        },
        parking: {
            disponible: '',
            superficie: '',
            nombreEntrees: '',
            nombreEntreesPrincipales: '',
            distanceParking: '',
            typeDeSol: '',
            navette: ''
        }, 
        materielNecessaire: [{ nom: '', quantite: 1 }],
        materielEnStock: [],
        materielSurSite: [],
        
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
            vignerons: eventVignerons,
            prestataires: eventPrestataires,
            animations: eventAnimations,
            sponsors: eventSponsors
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
                    <label htmlFor="description">Description de l'événement</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="form-control" />
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
                            <label htmlFor="besoinSignaletique">Besoin de signalétique :</label><br />
                            <input type="radio" id="oui" name="besoinSignaletique" value="Oui" />
                            <label htmlFor="oui">Oui</label><br />
                            <input type="radio" id="non" name="besoinSignaletique" value="Non" />
                            <label htmlFor="non">Non</label><br />
                            <label htmlFor="superficie">Superficie (en m²) :</label><br />
                            <input type="number" id="superficie" name="superficie" required /><br /><br />
                            <label htmlFor="Nombre_entrées_simples">Nombres d'entrées simples :</label><br />
                            <input type="number" id="nombre_entrées_simples" name="nombres d'entrées simples" required /><br /><br />
                            <label htmlFor="Nombre_entrées_principales">Nombre d'entrées principales :</label><br />
                            <input type="number" id="nombre_entrées_principales" name="nombre d'entrées principales" required /><br /><br />

                            {/* Forme */}
                <div className="mb-3">
                    <label>Forme</label>
                    {['Circulaire', 'Rectangulaire', 'Linéaire', 'Autre'].map(shape => (
                        <div key={shape}>
                            <input type="radio" id={shape} name="forme" value={shape} checked={formData.forme === shape} onChange={handleInputChange} />
                            <label htmlFor={shape}>{shape}</label>
                        </div>
                    ))}
                    <div className="mt-4">
                                <h2>Zone de dessin</h2>
                                <CanvasDraw />
                            </div>
                </div>

                {/* Chauffage */}
                <div className="mb-3">
                    <label>Chauffage</label>
                    <input type="radio" id="chauffageOui" name="chauffage" value="Oui" checked={formData.chauffage === 'Oui'} onChange={handleInputChange} />
                    <label htmlFor="chauffageOui">Oui</label>
                    <input type="radio" id="chauffageNon" name="chauffage" value="Non" checked={formData.chauffage === 'Non'} onChange={handleInputChange} />
                    <label htmlFor="chauffageNon">Non</label>
                </div>

                {/* Coin Fumeur */}
                <div className="mb-3">
                    <label>Coin Fumeur</label>
                    <input type="radio" id="coinFumeurOui" name="coinFumeur" value="Oui" checked={formData.coinFumeur === 'Oui'} onChange={handleInputChange} />
                    <label htmlFor="coinFumeurOui">Oui</label>
                    <input type="radio" id="coinFumeurNon" name="coinFumeur" value="Non" checked={formData.coinFumeur === 'Non'} onChange={handleInputChange} />
                    <label htmlFor="coinFumeurNon">Non</label>
                </div>

                {/* Coin traiteur */}
                <div className="mb-3">
                    <label>Coin Traiteur</label>
                    <input type="radio" id="coinTraiteurOui" name="coinTraiteur" value="Oui" checked={formData.coinTraiteur === 'Oui'} onChange={handleInputChange} />
                    <label htmlFor="coinTraiteurOui">Oui</label>
                    <input type="radio" id="coinTraiteurNon" name="coinTraiteur" value="Non" checked={formData.coinTraiteur === 'Non'} onChange={handleInputChange} />
                    <label htmlFor="coinTraiteurNon">Non</label>
                </div>

                {/* Bâtiment ERP */}
                <div className="mb-3">
                    <label>Bâtiment ERP</label>
                    <input type="radio" id="batimentERPOui" name="batimentERP" value="Oui" checked={formData.batimentERP === 'Oui'} onChange={handleInputChange} />
                    <label htmlFor="batimentERPOui">Oui</label>
                    <input type="radio" id="batimentERPNon" name="batimentERP" value="Non" checked={formData.batimentERP === 'Non'} onChange={handleInputChange} />
                    <label htmlFor="batimentERPNon">Non</label>
                </div>



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
                            <label htmlFor="besoinSignaletique">Besoin de signalétique :</label><br />
                            <input type="radio" id="oui" name="besoinSignaletique" value="Oui" />
                            <label htmlFor="oui">Oui</label><br />
                            <input type="radio" id="non" name="besoinSignaletique" value="Non" />
                            <label htmlFor="non">Non</label><br />
                            <label htmlFor="Abris">Abris :</label><br />
                            <input type="radio" id="vent" name="Abris" value="Oui" />
                            <label htmlFor="vent">Vent</label><br />
                            <input type="radio" id="pluie" name="Abris" value="Non" />
                            <label htmlFor="pluie">Pluie</label><br />
                            <input type="radio" id="non" name="Abris" value="Non" />
                            <label htmlFor="non">Non</label><br />  
                            
                            {/* Type de sol */}
                <div className="mb-3">
                    <label>Type de sol</label>
                    {['Sable', 'Gravier', 'Boueux', 'Goudron', 'Pavés', 'Herbe'].map(sol => (
                        <div key={sol}>
                            <input type="radio" id={sol} name="typeDeSol" value={sol} checked={formData.typeDeSol === sol} onChange={handleInputChange} />
                            <label htmlFor={sol}>{sol}</label>
                        </div>
                    ))}
                </div>

                {/* Nombre d'entrées */}
                <div className="mb-3">
                    <label htmlFor="nombreEntrees">Nombre d’entrées</label>
                    <input type="number" id="nombreEntrees" name="nombreEntrees" value={formData.nombreEntrees} onChange={handleInputChange} className="form-control" />
                </div>

                {/* Nombre d'entrées principales */}
                <div className="mb-3">
                    <label htmlFor="nombreEntreesPrincipales">Nombre d’entrées principales</label>
                    <input type="number" id="nombreEntreesPrincipales" name="nombreEntreesPrincipales" value={formData.nombreEntreesPrincipales} onChange={handleInputChange} className="form-control" />
                </div>

                {/* Superficie */}
                <div className="mb-3">
                    <label htmlFor="superficie">Superficie (m²)</label>
                    <input type="number" id="superficie" name="superficie" value={formData.superficie} onChange={handleInputChange} className="form-control" />
                </div>

                {/* Forme */}
                <div className="mb-3">
                    <label>Forme</label>
                    {['Circulaire', 'Rectangulaire', 'Linéaire', 'Autre'].map(forme => (
                        <div key={forme}>
                            <input type="radio" id={forme} name="forme" value={forme} checked={formData.forme === forme} onChange={handleInputChange} />
                            <label htmlFor={forme}>{forme}</label>
                        </div>
                    ))}
                    <div className="mt-4">
                                <h2>Zone de dessin</h2>
                                <CanvasDraw />
                            </div>
                </div>

                {/* Abris */}
                <div className="mb-3">
                    <label>Abris</label>
                    <input type="radio" id="abrisOui" name="abris" value="Oui" checked={formData.abris === 'Oui'} onChange={handleInputChange} />
                    <label htmlFor="abrisOui">Oui</label>
                    <input type="radio" id="abrisNon" name="abris" value="Non" checked={formData.abris === 'Non'} onChange={handleInputChange} />
                    <label htmlFor="abrisNon">Non</label>
                </div>

                {/* Végétation/zone protégée */}
                <div className="mb-3">
                    <label>Végétation/zone protégée</label>
                    <input type="radio" id="vegetationOui" name="vegetation" value="Oui" checked={formData.vegetation === 'Oui'} onChange={handleInputChange} />
                    <label htmlFor="vegetationOui">Oui</label>
                    <input type="radio" id="vegetationNon" name="vegetation" value="Non" checked={formData.vegetation === 'Non'} onChange={handleInputChange} />
                    <label htmlFor="vegetationNon">Non</label>
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
<label>Questions pour Intérieur</label>
                            <label htmlFor="besoinSignaletique">Besoin de signalétique :</label><br />
                            <input type="radio" id="oui" name="besoinSignaletique" value="Oui" />
                            <label htmlFor="oui">Oui</label><br />
                            <input type="radio" id="non" name="besoinSignaletique" value="Non" />
                            <label htmlFor="non">Non</label><br />
                            <label htmlFor="superficie">Superficie (en m²) :</label><br />
                            <input type="number" id="superficie" name="superficie" required /><br /><br />
                            <label htmlFor="Nombre_entrées_simples">Nombres d'entrées simples :</label><br />
                            <input type="number" id="nombre_entrées_simples" name="nombres d'entrées simples" required /><br /><br />
                            <label htmlFor="Nombre_entrées_principales">Nombre d'entrées principales :</label><br />
                            <input type="number" id="nombre_entrées_principales" name="nombre d'entrées principales" required /><br /><br />

                            {/* Forme */}
                <div className="mb-3">
                    <label>Forme</label>
                    {['Circulaire', 'Rectangulaire', 'Linéaire', 'Autre'].map(shape => (
                        <div key={shape}>
                            <input type="radio" id={shape} name="forme" value={shape} checked={formData.forme === shape} onChange={handleInputChange} />
                            <label htmlFor={shape}>{shape}</label>
                        </div>
                    ))}
                    <div className="mt-4">
                                <h2>Zone de dessin</h2>
                                <CanvasDraw />
                            </div>
                </div>

                {/* Chauffage */}
                <div className="mb-3">
                    <label>Chauffage</label>
                    <input type="radio" id="chauffageOui" name="chauffage" value="Oui" checked={formData.chauffage === 'Oui'} onChange={handleInputChange} />
                    <label htmlFor="chauffageOui">Oui</label>
                    <input type="radio" id="chauffageNon" name="chauffage" value="Non" checked={formData.chauffage === 'Non'} onChange={handleInputChange} />
                    <label htmlFor="chauffageNon">Non</label>
                </div>

                {/* Coin Fumeur */}
                <div className="mb-3">
                    <label>Coin Fumeur</label>
                    <input type="radio" id="coinFumeurOui" name="coinFumeur" value="Oui" checked={formData.coinFumeur === 'Oui'} onChange={handleInputChange} />
                    <label htmlFor="coinFumeurOui">Oui</label>
                    <input type="radio" id="coinFumeurNon" name="coinFumeur" value="Non" checked={formData.coinFumeur === 'Non'} onChange={handleInputChange} />
                    <label htmlFor="coinFumeurNon">Non</label>
                </div>

                {/* Coin traiteur */}
                <div className="mb-3">
                    <label>Coin Traiteur</label>
                    <input type="radio" id="coinTraiteurOui" name="coinTraiteur" value="Oui" checked={formData.coinTraiteur === 'Oui'} onChange={handleInputChange} />
                    <label htmlFor="coinTraiteurOui">Oui</label>
                    <input type="radio" id="coinTraiteurNon" name="coinTraiteur" value="Non" checked={formData.coinTraiteur === 'Non'} onChange={handleInputChange} />
                    <label htmlFor="coinTraiteurNon">Non</label>
                </div>

                {/* Bâtiment ERP */}
                <div className="mb-3">
                    <label>Bâtiment ERP</label>
                    <input type="radio" id="batimentERPOui" name="batimentERP" value="Oui" checked={formData.batimentERP === 'Oui'} onChange={handleInputChange} />
                    <label htmlFor="batimentERPOui">Oui</label>
                    <input type="radio" id="batimentERPNon" name="batimentERP" value="Non" checked={formData.batimentERP === 'Non'} onChange={handleInputChange} />
                    <label htmlFor="batimentERPNon">Non</label>
                </div>
                            
<label>Questions pour Extérieur</label>
                            <label htmlFor="besoinSignaletique">Besoin de signalétique :</label><br />
                            <input type="radio" id="oui" name="besoinSignaletique" value="Oui" />
                            <label htmlFor="oui">Oui</label><br />
                            <input type="radio" id="non" name="besoinSignaletique" value="Non" />
                            <label htmlFor="non">Non</label><br />
                            <label htmlFor="Abris">Abris :</label><br />
                            <input type="radio" id="vent" name="Abris" value="Oui" />
                            <label htmlFor="vent">Vent</label><br />
                            <input type="radio" id="pluie" name="Abris" value="Non" />
                            <label htmlFor="pluie">Pluie</label><br />
                            <input type="radio" id="non" name="Abris" value="Non" />
                            <label htmlFor="non">Non</label><br />  
                            
                            {/* Type de sol */}
                <div className="mb-3">
                    <label>Type de sol</label>
                    {['Sable', 'Gravier', 'Boueux', 'Goudron', 'Pavés', 'Herbe'].map(sol => (
                        <div key={sol}>
                            <input type="radio" id={sol} name="typeDeSol" value={sol} checked={formData.typeDeSol === sol} onChange={handleInputChange} />
                            <label htmlFor={sol}>{sol}</label>
                        </div>
                    ))}
                </div>

                {/* Nombre d'entrées */}
                <div className="mb-3">
                    <label htmlFor="nombreEntrees">Nombre d’entrées</label>
                    <input type="number" id="nombreEntrees" name="nombreEntrees" value={formData.nombreEntrees} onChange={handleInputChange} className="form-control" />
                </div>

                {/* Nombre d'entrées principales */}
                <div className="mb-3">
                    <label htmlFor="nombreEntreesPrincipales">Nombre d’entrées principales</label>
                    <input type="number" id="nombreEntreesPrincipales" name="nombreEntreesPrincipales" value={formData.nombreEntreesPrincipales} onChange={handleInputChange} className="form-control" />
                </div>

                {/* Superficie */}
                <div className="mb-3">
                    <label htmlFor="superficie">Superficie (m²)</label>
                    <input type="number" id="superficie" name="superficie" value={formData.superficie} onChange={handleInputChange} className="form-control" />
                </div>

                {/* Forme */}
                <div className="mb-3">
                    <label>Forme</label>
                    {['Circulaire', 'Rectangulaire', 'Linéaire', 'Autre'].map(forme => (
                        <div key={forme}>
                            <input type="radio" id={forme} name="forme" value={forme} checked={formData.forme === forme} onChange={handleInputChange} />
                            <label htmlFor={forme}>{forme}</label>
                        </div>
                    ))}
                    <div className="mt-4">
                                <h2>Zone de dessin</h2>
                                <CanvasDraw />
                            </div>
                </div>

                {/* Abris */}
                <div className="mb-3">
                    <label>Abris</label>
                    <input type="radio" id="abrisOui" name="abris" value="Oui" checked={formData.abris === 'Oui'} onChange={handleInputChange} />
                    <label htmlFor="abrisOui">Oui</label>
                    <input type="radio" id="abrisNon" name="abris" value="Non" checked={formData.abris === 'Non'} onChange={handleInputChange} />
                    <label htmlFor="abrisNon">Non</label>
                </div>

                {/* Végétation/zone protégée */}
                <div className="mb-3">
                    <label>Végétation/zone protégée</label>
                    <input type="radio" id="vegetationOui" name="vegetation" value="Oui" checked={formData.vegetation === 'Oui'} onChange={handleInputChange} />
                    <label htmlFor="vegetationOui">Oui</label>
                    <input type="radio" id="vegetationNon" name="vegetation" value="Non" checked={formData.vegetation === 'Non'} onChange={handleInputChange} />
                    <label htmlFor="vegetationNon">Non</label>
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

<div className="mb-3">
                    <label htmlFor="parking">Parking disponible ?</label>
                    <select id="parking" name="parking" value={formData.parking} onChange={handleInputChange} className="form-control">
                        <option value="">Sélectionner</option>
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                </div>

                {formData.parking === "oui" && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="superficie">Superficie du parking (en m²)</label>
                            <input type="number" id="superficie" name="superficie" value={formData.superficie} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombreEntrees">Nombre d’entrées du parking</label>
                            <input type="number" id="nombreEntrees" name="nombreEntrees" value={formData.nombreEntrees} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombreEntreesPrincipales">Nombre d’entrées principales du parking</label>
                            <input type="number" id="nombreEntreesPrincipales" name="nombreEntreesPrincipales" value={formData.nombreEntreesPrincipales} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="distanceParking">Distance du parking au lieu de l’événement (en mètres)</label>
                            <input type="number" id="distanceParking" name="distanceParking" value={formData.distanceParking} onChange={handleInputChange} className="form-control" />
                        </div>
                        <label htmlFor="navette">Navette :</label><br />
<input type="radio" id="navette-oui" name="Navette" value="Oui" onChange={() => setNavette('Oui')} />
<label htmlFor="navette-oui">Oui</label><br />
<input type="radio" id="vavette-non" name="Navette" value="Non" onChange={() => setNavette('Non')} />
<label htmlFor="navette-non">Non</label><br />

                        <div className="container mt-4">
                        <CheckboxGroup title="Moyens de trasmports desservissant la zone" checkboxes={[
                            { id: 'Tramway', label: 'Tramway' },
                            { id: ' Bus', label: 'Bus' },
                            { id: 'Taxis', label: 'Taxis' }
                        ]} />
                        </div>

                       
                    </>
                )}

                {formData.parking === "non" && (
                    <div className="alert alert-warning">
                        Aucun parking n'est disponible. Veuillez trouver un parking à proximité pour les participants.
                    </div>
                )}

                    <div className="container mt-4" >
                        <h1>Organisation personnel</h1>
                        
                        {/* <form onSubmit={handleVigneronSubmit}>
                    Nouveau Vigneron: Nom
                    <input type="text" name="name" value={vigneronData.name} onChange={e => setVigneronData({ ...vigneronData, name: e.target.value })} />
                    Contact
                    <input type="text" name="contact" value={vigneronData.contact} onChange={e => setVigneronData({ ...vigneronData, contact: e.target.value })} />
                    Prix
                    <input type="number" name="prix" value={vigneronData.prix} min="0" onChange={e => setVigneronData({ ...vigneronData, prix: parseInt(e.target.value, 10) })} />
                    Coût
                    <input type="number" name="cout" value={vigneronData.cout} min="0" onChange={e => setVigneronData({ ...vigneronData, cout: parseInt(e.target.value, 10) })} />
                    <input type="submit" value="Ajouter Vigneron" />
                </form> */}
                        <div >
                            <h2>Liste des Vignerons</h2>
                            <input
    type="text"
    placeholder="Rechercher par nom"
    value={searchTermVignerons}
    onChange={handleSearchChangeVignerons}
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
                        <div>
                <h2>Prestataires</h2>
                {/* <form onSubmit={handlePrestataireSubmit}>
                    Nouveau Prestataire: Nom 
                    <input type="text" name="name" onChange={handlePrestataireChange} value={prestataireData.name} />
                    Contact 
                    <input type="text" name="contact" onChange={handlePrestataireChange} value={prestataireData.contact} />
                    Prix 
                    <input type="number" name="prix" onChange={handlePrestataireChange} value={prestataireData.prix} min="0" />
                    Coût 
                    <input type="number" name="cout" onChange={handlePrestataireChange} value={prestataireData.cout} min="0" />
                    <input type="submit" value="Ajouter Prestataire" />
                </form> */}
                <input
    type="text"
    placeholder="Rechercher par nom"
    value={searchTermPrestataires}
    onChange={handleSearchChangePrestataires}
    className="form-control mb-3"
/>                <ul>
                    {filteredPrestataires.map(prestataire => (
                        <li key={prestataire.id}>
                            <input
                                type="checkbox"
                                checked={eventPrestataires.includes(prestataire.id)}
                                onChange={() => handlePrestataireSelect(prestataire.id)}
                            />
                            {prestataire.name} - {prestataire.contact} - {prestataire.prix}€ - {prestataire.cout}€
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Animations</h2>
                {/* <form onSubmit={handleAnimationSubmit}>
                    Nouvelle Animation: Nom 
                    <input type="text" name="name" onChange={handleAnimationChange} value={animationData.name} />
                    Contact 
                    <input type="text" name="contact" onChange={handleAnimationChange} value={animationData.contact} />
                    Prix 
                    <input type="number" name="prix" onChange={handleAnimationChange} value={animationData.prix} min="0" />
                    Coût 
                    <input type="number" name="cout" onChange={handleAnimationChange} value={animationData.cout} min="0" />
                    <input type="submit" value="Ajouter Animation" />
                </form> */}
                <input
    type="text"
    placeholder="Rechercher par nom"
    value={searchTermAnimations}
    onChange={handleSearchChangeAnimations}
    className="form-control mb-3"
/>                <ul>
                    {filteredAnimations.map(animation => (
                        <li key={animation.id}>
                            <input
                                type="checkbox"
                                checked={eventAnimations.includes(animation.id)}
                                onChange={() => handleAnimationSelect(animation.id)}
                            />
                            {animation.name} - {animation.contact} - {animation.prix}€ - {animation.cout}€
                        </li>
                    ))}
                </ul>
            </div>

            <div ref={orgPersonnelRef}>
                <h2>Sponsors</h2>
                {/* <form onSubmit={handleSponsorSubmit}>
                    Nouveau Sponsor: Nom 
                    <input type="text" name="name" onChange={handleSponsorChange} value={sponsorData.name} />
                    Contact 
                    <input type="text" name="contact" onChange={handleSponsorChange} value={sponsorData.contact} />
                    Prix 
                    <input type="number" name="prix" onChange={handleSponsorChange} value={sponsorData.prix} min="0" />
                    Coût 
                    <input type="number" name="cout" onChange={handleSponsorChange} value={sponsorData.cout} min="0" />
                    <input type="submit" value="Ajouter Sponsor" />
                </form> */}
                <input
    type="text"
    placeholder="Rechercher par nom"
    value={searchTermSponsors}
    onChange={handleSearchChangeSponsors}
    className="form-control mb-3"
/>                <ul>
                    {filteredSponsors.map(sponsor => (
                        <li key={sponsor.id}>
                            <input
                                type="checkbox"
                                checked={eventSponsors.includes(sponsor.id)}
                                onChange={() => handleSponsorSelect(sponsor.id)}
                            />
                            {sponsor.name} - {sponsor.contact} - {sponsor.prix}€ - {sponsor.cout}€
                        </li>
                    ))}
                </ul>
            </div>
            <h2>Dossier de sécurité</h2>

            <div>
                <form>
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleFileUpload}>Télécharger le fichier</button>
    </form>
    </div>
                    
                    </div>

                    
                    
                    <button type="submit">Soumettre</button>
                </form>
            </div>
        </div>
    );
}

export default CreationEvennement;
