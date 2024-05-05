const express = require('express');
const router = express.Router();
const { User } = require('../db/sequelize'); 
const bcrypt = require('bcrypt');

// Route pour la connexion des utilisateurs
router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Recherche de l'utilisateur par nom d'utilisateur
    User.findOne({ where: { username: username } })
    .then(user => {
        if (!user) {
            // Si aucun utilisateur n'est trouvé avec ce nom d'utilisateur
            res.status(404).json({ message: "Utilisateur non trouvé" });
        } else {
            // Comparaison du mot de passe fourni avec celui stocké dans la base de données
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    // Si les mots de passe correspondent
                    res.json({ message: "Connexion réussie", user: user });
                } else {
                    // Si les mots de passe ne correspondent pas
                    res.status(401).json({ message: "Mot de passe incorrect" });
                }
            });
        }
    })
    .catch(error => {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: "Erreur lors de la recherche de l'utilisateur" });
    });
});

module.exports = router;
