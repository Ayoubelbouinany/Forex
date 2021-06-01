const express= require('express');
const Panier= require('../controllers/Panier.Controller');
const route = express.Router();
let auth = require('../midelleware/auth');


route.post("/users/cart",Panier.AddToPanier);
route.get("/users/:user/cart",Panier.getCartByUserId);
route.get("/users",Panier.getCartByUserId)
route.get("/checkout/:cartId",Panier.checkout);
route.get('/payment/success',Panier.payment);
module.exports=route;