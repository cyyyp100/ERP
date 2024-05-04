const express = require('express');
const router = express.Router();
const evenements = require('../db/mock-evenement'); // Chemin vers vos données mockées ou logique de base de données

// Route pour obtenir tous les événements
router.get('/', (req, res) => {
    res.json(evenements);
});

module.exports = router;