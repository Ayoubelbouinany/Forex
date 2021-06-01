const express= require('express');
const user= require('../controllers/Users.Controller');
const route = express.Router();
route.post("/users/register",user.RegisterUser);
route.post("/users/login",user.Login);
route.get("/users/:fullName",user.getUser);
route.post('/updateSold',user.UpdateUserSold)
module.exports=route;