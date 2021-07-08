const express = require('express');
//appel méthode router de express
const sauceRouter = express.Router();

const Sauces = require('./models/sauces');

//routes
sauceRouter.post('/', (req, res, next) => {
    delete req.body._id;
    const sauces = new Sauces({
        ...req.body
    });
    sauces.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
  });

sauceRouter.put('/:id', (req, res, next) => {
  Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

sauceRouter.delete('/:id', (req, res, next) => {
  Sauces.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

sauceRouter.get('/:id', (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(404).json({ error }));
});

sauceRouter.get('/', (req, res, next) => {
    Sauces.find()
    .then(sauces => res.status(200).json(sauces)) // Promise
    .catch(error => res.status(400).json({ error }));
});

module.exports = sauceRouter;