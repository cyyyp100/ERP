const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const vignerons = require('./mock-vigneron');
const VigneronModel = require('../models/vigneron');
const animations = require('./mock-animation');
const animationModel = require('../models/animation');
const materiels = require('./mock-materiel');
const materielModel = require('../models/materiel');
const sponsors = require('./mock-sponsor');
const SponsorModel = require('../models/sponsor');
const evenements = require('./mock-evenement');
const EvenementModel = require('../models/evenement');
const prestataires = require('./mock-prestataires');
const PrestataireModel = require('../models/prestataires');

const sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2',
    },
    logging: false
});

const User = UserModel(sequelize, DataTypes);
const Vigneron = VigneronModel(sequelize, DataTypes);
const Animation = animationModel(sequelize, DataTypes);
const Materiel = materielModel(sequelize, DataTypes);
const Sponsor = SponsorModel(sequelize, DataTypes);
const Evenement = EvenementModel(sequelize, DataTypes);
const Prestataire = PrestataireModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync({ force: true }).then(() => {
        bcrypt.hash('admin', 10)
            .then(hash => {
                User.create({
                    username: "admin",
                    password: hash
                }).then(user => {
                    console.log('Utilisateur admin créé:', user.toJSON());
                }).catch(err => {
                    console.error('Erreur lors de la création de l\'utilisateur admin:', err);
                });
            }).catch(err => {
                console.error('Erreur lors du hachage du mot de passe:', err);
            });

        vignerons.map(vigneron => {
            Vigneron.create({
                name: vigneron.name,
                prix: vigneron.prix,
                cout: vigneron.cout,
                contact: vigneron.contact
            }).then(vigneron => console.log(vigneron.toJSON()));
        });

        prestataires.map(prestataire => {
            Prestataire.create({
                name: prestataire.name,
                prix: prestataire.prix,
                cout: prestataire.cout,
                contact: prestataire.contact
            }).then(prestataire => console.log(prestataire.toJSON()));
        });

        animations.map(animation => {
            Animation.create({
                name: animation.name,
                prix: animation.prix,
                cout: animation.cout,
                contact: animation.contact
            }).then(animation => console.log(animation.toJSON()));
        });

        materiels.map(materiel => {
            Materiel.create({
                name: materiel.name,
                quantite_necessaire: materiel.quantite_necessaire,
                quantite_en_stock: materiel.quantite_en_stock,
                quantite_sur_place: materiel.quantite_sur_place,
                contact_location: materiel.contact_location
            }).then(materiel => console.log(materiel.toJSON()));
        });

        sponsors.map(sponsor => {
            Sponsor.create({
                name: sponsor.name,
                prix: sponsor.prix,
                cout: sponsor.cout,
                contact: sponsor.contact
            }).then(sponsor => console.log(sponsor.toJSON()));
        });

        evenements.map(evenement => {
            Evenement.create({
                nom: evenement.nom,
                dateDebut: evenement.dateDebut,
                heureDebut: evenement.heureDebut,
                dateFin: evenement.dateFin,
                heureFin: evenement.heureFin,
                lieu: evenement.lieu,
                typeLieu: evenement.typeLieu,
                objectifs: Array.isArray(evenement.objectifs) ? evenement.objectifs.join(', ') : '',
                questionsInterieur: JSON.stringify(evenement.questionsInterieur),
                questionsExterieur: JSON.stringify(evenement.questionsExterieur),
                questionsMixte: JSON.stringify(evenement.questionsMixte),
                vignerons: Array.isArray(evenement.vignerons) ? evenement.vignerons.join(', ') : '',
                prestataires: Array.isArray(evenement.prestataires) ? evenement.prestataires.join(', ') : '',
                materielNecessaire: evenement.materielNecessaire,
                materielEnStock: evenement.materielEnStock,
                materielSurSite: evenement.materielSurSite,
                parking: JSON.stringify(evenement.parking),
                activites: evenement.activities,
                activitesDetails: evenement.djDetails,
            }).then(evenement => console.log(evenement.toJSON()));
        });
    });
};

module.exports = {
    initDb, Vigneron, Sponsor, Materiel, Animation, Evenement, User, Prestataire
};
