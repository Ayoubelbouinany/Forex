const express= require('express');
const Produit= require('../controllers/Devises.controller');
const route = express.Router();
const auth = require('../midelleware/auth');
const admin = require('../midelleware/admin');

route.post("/addProduct",Produit.addNewProduct);
route.get("/products/:vendeur",Produit.getProduct);
route.get("/product/:id",Produit.ProductById);
route.delete("/deleteProduct/:id",Produit.DeleteProductById);
route.get('/removeAllProduct', Produit.removeAllProduct);

module.exports=route;