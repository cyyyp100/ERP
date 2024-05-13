const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sequelize = require('./db/sequelize');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3001;

// Importation des modules de route
const evenementsRoutes = require('./routes/evennements');
const loginRoutes = require('./routes/login');
const vigneronsRoutes = require('./routes/vigneron');
const prestatairesRoutes = require('./routes/prestataire');

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

app.use((req, res, next) => {
    res.status(404).send('Resource not found!');
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
