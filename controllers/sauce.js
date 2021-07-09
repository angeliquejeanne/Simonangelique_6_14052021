//importation du modèle Sauce
const Sauce = require('../models/sauce');
//importation module node fs (intéraction avec le système de fichier)
const fs = require("fs");
//importation module body-parser (permet d'extraire des objet JSON)
const bodyParser = require("body-parser");

//ajout de sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce.save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

//modif sauce
exports.modifySauce = (req, res, next) => {
    //vérifie si req.file existe
    const sauceObject = req.file
    ? {
        //il existe : traitement de la nouvelle image
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        //il n'existe pas : traitement de l'objet - entrant
      }
    : { ...req.body };
  Sauce.updateOne({ _id: req.params.id },{ ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

//voir l'intégralité des sauces
exports.getAllSauce = (req, res, next) => {
  //Tableau de donnée de sauces
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
  
//voir qu'une seule sauce
exports.getOneSauce = (req, res, next) => {
  //Renvoit la sauce avec l'id correspondant
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};
  
//supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      //récupération du nom de fichier
      const filename = sauce.imageUrl.split("/images/")[1];
      //supression du fichier
      fs.unlink(`images/${filename}`, () => {
        //supression le Sauce de la bdd
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

