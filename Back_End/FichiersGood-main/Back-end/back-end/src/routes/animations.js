// /mnt/data/animations.js

const express = require('express');
const router = express.Router();
const { Animation } = require('../db/sequelize');

// Route pour récupérer toutes les animations
router.get('/', (req, res) => {
    const searchName = req.query.name || '';
    const whereClause = searchName ? { where: { name: { [Op.like]: `%${searchName}%` } } } : {};
    
    Animation.findAll(whereClause)
    .then(animations => {
        res.json(animations);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des animations:', error);
        res.status(500).json({ message: "Erreur lors de la récupération des animations" });
    });
});

// Route pour ajouter une nouvelle animation
router.post('/', async (req, res) => {
    try {
        const { name, prix, cout, contact } = req.body;
        const newAnimation = await Animation.create({ name, prix, cout, contact });
        res.status(201).json(newAnimation);
    } catch (error) {
        console.error('Erreur lors de l’ajout de l’animation:', error);
        res.status(500).send('Erreur lors de l’ajout de l’animation');
    }
});

// Route pour mettre à jour une animation
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, prix, cout, contact } = req.body;
        const animation = await Animation.findByPk(id);
        if (!animation) {
            return res.status(404).json({ message: "Animation non trouvée" });
        }
        await animation.update({ name, prix, cout, contact });
        res.json(animation);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l’animation:', error);
        res.status(500).send('Erreur lors de la mise à jour de l’animation');
    }
});

// Route pour supprimer une animation
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const animation = await Animation.findByPk(id);
        if (!animation) {
            return res.status(404).json({ message: "Animation non trouvée" });
        }
        await animation.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Erreur lors de la suppression de l’animation:', error);
        res.status(500).send('Erreur lors de la suppression de l’animation');
    }
});

module.exports = router;
