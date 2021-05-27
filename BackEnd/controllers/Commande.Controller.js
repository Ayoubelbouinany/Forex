let Commande = require('../models/FrontOffice/Commande.module');
const { ErrorHandler } = require('../midelleware/ErrorHandler');



let getAllCommande= async (req,res,next)=>{
 await Commande.getAllCommandes(function(err,listC){
    if(err) return next(err)
    res.json({commandes:listC})
});
};

let getCommandeByUserId= async (req,res,next)=>{
    let {userId}= req.params;
    await Commande.getCommandeByUserId(userId,function(err,listC){
       if(err) return next(err)
       res.json({commandes:listC})
   });
   };


   let getCommandeById= async (req,res,next)=>{
    let {commandeId}= req.params;
    await Commande.getCommandeById(commandeId,function(err,C){
       if(err) return next(err)
       res.json({commande:C})
   });
   };

   module.exports ={
    getAllCommande,getCommandeByUserId,getCommandeById
   }