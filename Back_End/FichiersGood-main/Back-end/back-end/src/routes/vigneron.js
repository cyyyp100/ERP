const express = require('express');
const router = express.Router();
const { Vigneron } = require('../db/sequelize');
const fs = require('fs');

// Route pour récupérer tous les vignerons
router.get('/api/vignerons', (req, res) => {
    // Supposant que vous voulez utiliser Sequelize pour récupérer les données
    Vigneron.findAll()
    .then(vignerons => {
        res.json(vignerons);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des vignerons:', error);
        res.status(500).json({ message: "Erreur lors de la récupération des vignerons" });
    });
});

// Route pour créer un vigneron
router.post('/', async (req, res) => {
    try {
        const { nom_vigneron, contact_vigneron, prix } = req.body;
        const nouveauVigneron = await Vigneron.create({
            name: nom_vigneron,
            contact: contact_vigneron,
            prix: prix,
        });
        res.status(201).json(nouveauVigneron);
    } catch (error) {
        console.error('Erreur lors de la création du vigneron', error);
        res.status(500).send('Erreur lors de la création du vigneron');
    }
});

module.exports = router;