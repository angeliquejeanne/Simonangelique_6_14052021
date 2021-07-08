//importation du modèle Sauce
const Sauces = require('../models/sauce'); 

//ajout de sauce
exports.addSauces = (req, res, next) => {
    delete req.body._id;
    const sauces = new Sauces({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    sauces.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
  };

//modif sauce
exports.modifySauce = (req, res, next) => {
    //vérifie si req.file existe
    const sauceObject = new Sauce({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
      });
    Sauce.updateOne(
      { _id: req.params.id },
      { ...sauceObject, _id: req.params.id }
    )
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
    Thing.deleteOne({_id: req.params.id})
    .then(() => {res.status(200).json({message: 'Deleted!'});})
    .catch((error) => {res.status(400).json({error: error}); });
};
