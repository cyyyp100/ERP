// /mnt/data/materiels.js

const express = require('express');
const router = express.Router();
const { Materiel } = require('../db/sequelize'); // Correct the import statement

// Route pour récupérer tous les Materiels
router.get('/', (req, res) => {
    const searchName = req.query.name || '';
    const whereClause = searchName ? { where: { name: { [Op.like]: `%${searchName}%` } } } : {};
    
    Materiel.findAll(whereClause)
    .then(materiels => {
        res.json(materiels);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des Materiels:', error);
        res.status(500).json({ message: "Erreur lors de la récupération des Materiels" });
    });
});

// Route pour ajouter un nouveau Materiel
router.post('/', async (req, res) => {
    try {
        const { name, quantite_necessaire, quantite_en_stock, quantite_sur_place, contact_location } = req.body;
        const newMateriel = await Materiel.create({ name, quantite_necessaire, quantite_en_stock, quantite_sur_place, contact_location });
        res.status(201).json(newMateriel);
    } catch (error) {
        console.error('Erreur lors de l’ajout du Materiel:', error);
        res.status(500).send('Erreur lors de l’ajout du Materiel');
    }
});

// Route pour mettre à jour un Materiel
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, quantite_necessaire, quantite_en_stock, quantite_sur_place, contact_location } = req.body;
        const materiel = await Materiel.findByPk(id);
        if (!materiel) {
            return res.status(404).json({ message: "Materiel non trouvé" });
        }
        await materiel.update({ name, quantite_necessaire, quantite_en_stock, quantite_sur_place, contact_location });
        res.json(materiel);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du Materiel:', error);
        res.status(500).send('Erreur lors de la mise à jour du Materiel');
    }
});

// Route pour supprimer un Materiel
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const materiel = await Materiel.findByPk(id);
        if (!materiel) {
            return res.status(404).json({ message: "Materiel non trouvé" });
        }
        await materiel.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Erreur lors de la suppression du Materiel:', error);
        res.status(500).send('Erreur lors de la suppression du Materiel');
    }
});

module.exports = router;

