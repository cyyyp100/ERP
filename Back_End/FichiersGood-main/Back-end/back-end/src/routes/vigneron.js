const express = require('express');
const router = express.Router();
const { Vigneron } = require('../db/sequelize');

// Route pour récupérer tous les vignerons
router.get('/', (req, res) => {
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
        const { name, prix, cout, contact } = req.body;
        const newVigneron = await Vigneron.create({ name, prix, cout, contact });
        res.status(201).json(newVigneron);
    } catch (error) {
        console.error('Erreur lors de l’ajout du vigneron:', error);
        res.status(500).send('Erreur lors de l’ajout du vigneron');
    }
});

module.exports = router;
