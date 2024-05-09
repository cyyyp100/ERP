const express = require('express');
const router = express.Router();
const fs = require('fs'); // Assurez-vous d'inclure le module fs pour lire les fichiers
const evenements = require('../db/mock-evenement');  // Assurez-vous que le chemin est correct

// Route pour obtenir tous les événements
router.get('/', (req, res) => {
    res.json(evenements);
});

// Route pour créer un nouvel événement
router.post('/', (req, res) => {
    const {
        dateDebut, heureDebut, dateFin, heureFin, lieu, typeLieu, objectifs,
        questionsInterieur, questionsExterieur, questionsMixte,
        vignerons, prestataires  // Nouveaux champs pour vignerons et prestataires
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
        vignerons: vignerons.map(v => v.name).join(', '),  // Stockage des noms des vignerons
        prestataires: prestataires.map(p => p.name).join(', '),  // Stockage des noms des prestataires
        created: new Date()
    };

    evenements.push(nouvelEvenement);
    res.status(201).json(nouvelEvenement);
});

module.exports = router;
