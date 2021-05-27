const express= require('express');
const Commande= require('../controllers/Commande.Controller');
const route = express.Router();
const auth = require('../midelleware/auth');
const admin = require('../midelleware/admin')

route.get("/commandes",admin,Commande.getAllCommande);

route.get("/commandes/:userId",auth,Commande.getCommandeByUserId);

route.get("/commande/:commandeId",auth,Commande.getCommandeById);
module.exports=route;