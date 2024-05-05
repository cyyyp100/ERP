const express = require('express');
const router = express.Router();
const {Prestataire } = require('../db/sequelize');
const fs = require('fs');

// Route pour récupérer tous les prestataires
router.get('/', (req, res) => {
    // Supposant que vous voulez utiliser Sequelize pour récupérer les données
    Prestataire.findAll()
    .then(prestataires => {
        res.json(prestataires);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des prestataires:', error);
        res.status(500).json({ message: "Erreur lors de la récupération des prestataires" });
    });
});


router.post('/', async (req, res) => {
    try {
        const { name, prix, cout, contact } = req.body;
        const newPrestataire = await Prestataire.create({ name, prix, cout, contact });
        res.status(201).json(newPrestataire);
    } catch (error) {
        console.error('Erreur lors de l’ajout du prestataire:', error);
        res.status(500).send('Erreur lors de l’ajout du prestataire');
    }
});
module.exports = router;