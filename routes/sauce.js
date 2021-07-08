const express = require('express');
//appel méthode router de express
const sauceRouter = express.Router();

//importation des controllers sauce
const sauceCtrl = require("../controllers/sauce");

//routes
sauceRouter.post("/", auth, multer, sauceCtrl.addSauce);

sauceRouter.put("/:id", auth, multer, sauceCtrl.modifySauce);

sauceRouter.get("/", auth, sauceCtrl.getAllSauce);

sauceRouter.get("/:id", auth, sauceCtrl.getOneSauce);

sauceRouter.delete("/:id", auth, sauceCtrl.deleteSauce);

sauceRouter.post("/:id/like", auth, sauceCtrl.likeStatusSauce);

module.exports = sauceRouter;