//importation du modèle Sauce
const Sauces = require("../models/sauce"); 

//ajout de sauce
exports.createSauces = (req, res, next) => {
    delete req.body._id;
    const sauces = new Sauces({
        ...req.body
    });
    sauces.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
  }