// /mnt/data/App.js (back-end)

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sequelize = require('./db/sequelize');
const cors = require('cors');
const app = express();
const port = 3001;
const multer = require('multer');
const upload = multer({ dest: '/api/uploads/' });

// Importation des modules de route
const evenementsRoutes = require('./routes/evennements');
const loginRoutes = require('./routes/login');
const vigneronsRoutes = require('./routes/vigneron');
const prestatairesRoutes = require('./routes/prestataire');
const sponsorsRoutes = require('./routes/sponsors'); // Ajouté
const animationsRoutes = require('./routes/animations'); // Ajouté
const materielRoutes = require('./routes/materiels'); // Ajouté

// Initialisation de la base de données
sequelize.initDb();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/evenements', evenementsRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/vignerons', vigneronsRoutes);
app.use('/api/prestataires', prestatairesRoutes);
app.use('/api/sponsors', sponsorsRoutes); // Ajouté
app.use('/api/animations', animationsRoutes); // Ajouté
app.use('/api/materiel', materielRoutes); // Ajouté

app.use((req, res, next) => {
    res.status(404).send('Resource not found!');
});

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.send('Fichier téléchargé avec succès');
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
