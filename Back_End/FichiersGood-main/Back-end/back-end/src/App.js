const express = require('express')
const morgan = require('morgan')
//const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./db/sequelize')
const app = express()
const port = 3001
const evenementsRoutes = require('C:/Users/cypri/Desktop/Ecole/ingenieur_logiciel/API_JJ/API/Back_End/FichiersGood-main/Back-end/back-end/src/routes/evennements');
const fs = require('fs');
const loginRoutes = require('C:/Users/cypri/Desktop/Ecole/ingenieur_logiciel/API_JJ/API/Back_End/FichiersGood-main/Back-end/back-end/src/routes/login');


app.use(express.json());
const cors = require('cors');
app.use(cors()); // Active CORS pour toutes les routes


// Routes pour gérer les requêtes d'événements
app.use('/api/evenements', evenementsRoutes);
app.use('/api/login', loginRoutes);

//Middleware, qui affiche l'URL des requètes entrantes vers l'API Rest: 
app
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()

const Vigneron = require('./models/vigneron')(sequelize, Sequelize.DataTypes);

app.post('/api/vignerons', async (req, res) => {
  try {
    const { nom_vigneron, contact_vigneron, prix } = req.body;
    const nouveauVigneron = await Vigneron.create({
      name: nom_vigneron,
      contact: contact_vigneron,
      prix: prix,
    });
    res.status(201).json(nouveauVigneron);
  } catch (error) {
    console.error('Erreur lors de la création du vigneron', error);
    res.status(500).send('Erreur lors de la création du vigneron');
  }
});



app.get('/evenements', (req, res) => {
    // Lire le fichier evenement.json
    fs.readFile('evenement.json', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la lecture du fichier d\'événement');
        return;
      }
      const evenements = JSON.parse(data);
      res.json(evenements);
    });
  });

  
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.status(400).send('Nom d\'utilisateur et mot de passe requis');
        return;
    }
})

app.post('/api/evenements', async (req, res) => {
  try {
    const { nom, dateDebut, heureDebut, dateFin, heureFin, lieu, objectifs, typeLieu } = req.body;
    const nouvelEvenement = await Evenement.create({
      name: nom,
      dateDebut,
      heureDebut,
      dateFin,
      heureFin,
      lieu,
      Objectif_de_l_evenement: objectifs.join(', '), // Assurez-vous que le modèle peut gérer ce format
      typeLieu
    });
    res.status(201).json(nouvelEvenement);
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement', error);
    res.status(500).send('Erreur lors de la création de l\'événement');
  }
});


//require('./src/routes/findAllPokemons')(app) //'app' est l'application Express
//require('./src/routes/findPokemonsByPk')(app)
//require('./src/routes/createPokemons')(app)
//require('./src/routes/updatePokemon')(app)
//require('./src/routes/deletePokemon')(app)
//require('./src/routes/login')(app)

//ajout de la gestion d'erreur 404:
app.use(({res})=> {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`)) 
