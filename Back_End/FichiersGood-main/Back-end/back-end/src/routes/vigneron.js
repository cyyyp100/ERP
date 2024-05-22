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

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const vigneron = await Vigneron.findByPk(id);
        if (vigneron) {
            await vigneron.destroy();
            res.status(200).send('Vigneron supprimé avec succès');
        } else {
            res.status(404).send('Vigneron non trouvé');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du vigneron:', error);
        res.status(500).send('Erreur lors de la suppression du vigneron');
    }
});

// Route pour mettre à jour un vigneron
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, prix, cout, contact } = req.body;
        const vigneron = await Vigneron.findByPk(id);
        if (vigneron) {
            vigneron.name = name;
            vigneron.prix = prix;
            vigneron.cout = cout;
            vigneron.contact = contact;
            await vigneron.save();
            res.json(vigneron);
        } else {
            res.status(404).send('Vigneron non trouvé');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du vigneron:', error);
        res.status(500).send('Erreur lors de la mise à jour du vigneron');
    }
});

module.exports = router;

module.exports = router;
