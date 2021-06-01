const express= require('express');
const Commande= require('../controllers/Commande.Controller');
const route = express.Router();
const auth = require('../midelleware/auth');
const admin = require('../midelleware/admin')

route.get("/commandes",admin,Commande.getAllCommande);

route.get("/commandes/:userId",Commande.getCommandeByUserId);
route.post("/addCommande",Commande.AddCommande);
route.post("/UpdateDevises",Commande.UpdateQuantityDevises);
route.get("/commande/:commandeId",Commande.getCommandeById);
module.exports=route;