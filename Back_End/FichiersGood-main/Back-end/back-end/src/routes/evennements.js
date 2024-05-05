const express = require('express');
const router = express.Router();
const fs = require('fs'); // Assurez-vous d'inclure le module fs pour lire les fichiers
const evenements = require('../db/mock-evenement');  // Assurez-vous que le chemin est correct

// Route pour obtenir tous les événements
router.get('/', (req, res) => {
    res.json(evenements);
});

// Route pour créer un nouvel événement
router.post('/', async (req, res) => {
    try {
        const { nom, dateDebut, heureDebut, dateFin, heureFin, lieu, objectifs, typeLieu } = req.body;
        // Supposons que vous avez un modèle Evenement correctement configuré
        const Evenement = require('../models/evenement'); // Assurez-vous que le chemin vers votre modèle est correct
        const nouvelEvenement = await Evenement.create({
            name: nom,
            dateDebut,
            heureDebut,
            dateFin,
            heureFin,
            lieu,
            Objectif_de_l_evenement: objectifs.join(', '),
            typeLieu
        });
        res.status(201).json(nouvelEvenement);
    } catch (error) {
        console.error('Erreur lors de la création de l\'événement', error);
        res.status(500).send('Erreur lors de la création de l\'événement');
    }
});

module.exports = router;
