// /mnt/data/prestataire.js

const express = require('express');
const router = express.Router();
const { Prestataire } = require('../db/sequelize');

// Route pour récupérer tous les prestataires
router.get('/', (req, res) => {
    const searchName = req.query.name || '';
    const whereClause = searchName ? { where: { name: { [Op.like]: `%${searchName}%` } } } : {};
    
    Prestataire.findAll(whereClause)
    .then(prestataires => {
        res.json(prestataires);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des prestataires:', error);
        res.status(500).json({ message: "Erreur lors de la récupération des prestataires" });
    });
});

// Route pour ajouter un nouveau prestataire
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

// Route pour mettre à jour un prestataire
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, prix, cout, contact } = req.body;
        const prestataire = await Prestataire.findByPk(id);
        if (!prestataire) {
            return res.status(404).json({ message: "Prestataire non trouvé" });
        }
        await prestataire.update({ name, prix, cout, contact });
        res.json(prestataire);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du prestataire:', error);
        res.status(500).send('Erreur lors de la mise à jour du prestataire');
    }
});

// Route pour supprimer un prestataire
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const prestataire = await Prestataire.findByPk(id);
        if (!prestataire) {
            return res.status(404).json({ message: "Prestataire non trouvé" });
        }
        await prestataire.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Erreur lors de la suppression du prestataire:', error);
        res.status(500).send('Erreur lors de la suppression du prestataire');
    }
});

module.exports = router;
