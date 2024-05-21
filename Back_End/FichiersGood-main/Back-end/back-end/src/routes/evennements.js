const express = require('express');
const router = express.Router();
const fs = require('fs'); // Assurez-vous d'inclure le module fs pour lire les fichiers
const evenements = require('../db/mock-evenement');  // Assurez-vous que le chemin est correct

// Route pour obtenir tous les événements
router.get('/', (req, res) => {
    res.json(evenements);
});

router.get('/:id', (req, res) => {
    const event = evenements.find(e => e.id === parseInt(req.params.id));
    if (event) {
        res.json(event);
    } else {
        res.status(404).send({ message: 'Événement non trouvé' });
    }
});

// Route pour créer un nouvel événement
router.post('/', (req, res) => {
    const {
        dateDebut, heureDebut, dateFin, heureFin, lieu, typeLieu, objectifs,
        questionsInterieur, questionsExterieur, questionsMixte,
        vignerons, prestataires  
    } = req.body;

    const nouvelEvenement = {
        id: evenements.length + 1,
        dateDebut,
        heureDebut,
        dateFin,
        heureFin,
        lieu,
        typeLieu,
        objectifs: objectifs.join(', '),
        questionsInterieur,
        questionsExterieur,
        questionsMixte,
        vignerons: vignerons.map(v => v.name).join(', '),  
        prestataires: prestataires.map(p => p.name).join(', '),  
        created: new Date()
    };

    evenements.push(nouvelEvenement);
    res.status(201).json(nouvelEvenement);
});

module.exports = router;
