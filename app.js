// Ajout du framework express au projet
const express = require('express');
//ajout de body-parser au projet : permet extraction d'objet JSON
const bodyParser = require('body-parser');
//ajout de mongoose au projet : gestion de la DB
const mongoose = require('mongoose');
// Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier.
const path = require('path');

//importation des fichiers routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


//connexion à la DB
mongoose.connect('mongodb+srv://FirstUser:FirstUs3r@cluster0.m0bet.mongodb.net/myFirstDataBase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// ajout d'un middleware, qui sera le premier à être executer par le server, il sera appliquer à toutes les routes, toutes les requêtes envoyer à notre server.
// correction des erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // l'origin qui a le droit d'acceder à l'api : tout le monde
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Authorisation d'utiliser certains en-tête dans l'objet requête
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // ceci va permettre à l'application d'accéder à l'api sans problème
    next(); // Ne pas oublie d'appeler next pour passer au middleware d'après
  });

//middleware global : JSON
app.use(bodyParser.json());

//routes
//express doit gérer la ressource image de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauce', sauceRoutes);

module.exports = app;