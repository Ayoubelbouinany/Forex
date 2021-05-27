const express= require('express');
const user= require('../controllers/Users.Controller');
const route = express.Router();
route.post("/users/register",user.RegisterUser);
route.post("/users/login",user.Login);


module.exports=route;