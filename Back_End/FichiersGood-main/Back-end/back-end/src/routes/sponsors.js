// /mnt/data/sponsors.js

const express = require('express');
const router = express.Router();
const { Sponsor } = require('../db/sequelize');

// Route pour récupérer tous les sponsors
router.get('/', (req, res) => {
    const searchName = req.query.name || '';
    const whereClause = searchName ? { where: { name: { [Op.like]: `%${searchName}%` } } } : {};
    
    Sponsor.findAll(whereClause)
    .then(sponsors => {
        res.json(sponsors);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des sponsors:', error);
        res.status(500).json({ message: "Erreur lors de la récupération des sponsors" });
    });
});

// Route pour ajouter un nouveau sponsor
router.post('/', async (req, res) => {
    try {
        const { name, contact } = req.body;
        const newSponsor = await Sponsor.create({ name, contact });
        res.status(201).json(newSponsor);
    } catch (error) {
        console.error('Erreur lors de l’ajout du sponsor:', error);
        res.status(500).send('Erreur lors de l’ajout du sponsor');
    }
});

// Route pour mettre à jour un sponsor
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, contact } = req.body;
        const sponsor = await Sponsor.findByPk(id);
        if (!sponsor) {
            return res.status(404).json({ message: "Sponsor non trouvé" });
        }
        await sponsor.update({ name, contact });
        res.json(sponsor);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du sponsor:', error);
        res.status(500).send('Erreur lors de la mise à jour du sponsor');
    }
});

// Route pour supprimer un sponsor
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sponsor = await Sponsor.findByPk(id);
        if (!sponsor) {
            return res.status(404).json({ message: "Sponsor non trouvé" });
        }
        await sponsor.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Erreur lors de la suppression du sponsor:', error);
        res.status(500).send('Erreur lors de la suppression du sponsor');
    }
});

module.exports = router;
