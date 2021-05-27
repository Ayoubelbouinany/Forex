const express= require('express');
const mongoose = require("./database/config");
const bodyParser= require('body-parser');
const fs = require('fs');
const app= express();
const cors = require('cors');
const loggers = require('./database/loggs');
const morgan = require('morgan');
//router

let RouteUser= require('./route/routeUser');
let RouteProduct= require('./route/routeProduit');
let RouteCommande = require('./route/routeCommande');
let RoutePanier = require('./route/routePanier');
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTION");
    next();
    });

app.use("/api",RouteUser);
app.use('/api',RouteProduct);
app.use('/api',RoutePanier);
app.use('/api', RouteCommande);
app.use(function(req, res, next) {
    res.status(404).send('Sorry Dont find this route');
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).json(err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    // loggers.info(`Server listen this Port ${PORT}`);
    // loggers.error("sommting wrong");
    console.info(`Server listen this Port ${PORT}`);
});