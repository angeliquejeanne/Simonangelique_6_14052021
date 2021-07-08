//utilisation pour hashage du mot de passe
const bcrypt = require("bcrypt");

//importation du model User
const User = require("../models/user");


exports.signup = (req, res, next) => {
  // il s'agit d'une fonction asynchrone qui va prendre du temps
  //cryptage du mot de passe
  bcrypt.hash(req.body.password, 10)
  //creation user et enregistrement dans le base de donnée
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {

};