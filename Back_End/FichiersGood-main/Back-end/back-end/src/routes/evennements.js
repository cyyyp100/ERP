const express = require('express');
const router = express.Router();
const { Evenement } = require('../db/sequelize');

// Route pour créer un nouvel événement
router.post('/', async (req, res) => {
    try {
        const { nom, dateDebut, heureDebut, dateFin, heureFin, lieu, typeLieu, objectifs, questionsInterieur, questionsExterieur, questionsMixte, vignerons, prestataires } = req.body;

        // Validate required fields
        if (!nom) {
            return res.status(400).json({ error: 'The "nom" field is required.' });
        }

        const newEvenement = await Evenement.create({
            nom,
            dateDebut,
            heureDebut,
            dateFin,
            heureFin,
            lieu,
            typeLieu,
            objectifs: Array.isArray(objectifs) ? objectifs.join(', ') : objectifs,
            questionsInterieur,
            questionsExterieur,
            questionsMixte,
            vignerons: Array.isArray(vignerons) ? vignerons.join(', ') : vignerons,
            prestataires: Array.isArray(prestataires) ? prestataires.join(', ') : prestataires
        });

        res.status(201).json(newEvenement);
    } catch (error) {
        console.error('Error creating Evenement:', error);
        res.status(500).json({ error: 'An error occurred while creating the evenement.' });
    }
});


// Route pour récupérer tous les événements
router.get('/', async (req, res) => {
    try {
        const evenements = await Evenement.findAll();
        res.json(evenements);
    } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        res.status(500).send('Erreur lors de la récupération des événements');
    }
});

module.exports = router;

