let Commande = require('../models/FrontOffice/Commande.module');
const { ErrorHandler } = require('../midelleware/ErrorHandler');
const nodemailer = require('nodemailer')
let Product = require('../models/FrontOffice/Devises.module');

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

   //Add commande
let AddCommande= async(req,res,next)=>{
    let {email,fullName,totalQuantity,totalPrice,cur}=req.body;
   var newCommande = new Commande({
    User:fullName,
    totalPrice:totalPrice,
    totalQuantity:totalQuantity
  })
   await Commande.addCommande(newCommande,function (err, commande){
     if(err) return next(err.message)
     res.send(commande);
    
    
    let transporter =  nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: '###',
         pass: '####'
        },
      })
     

       let info =  transporter.sendMail({
        from: 'Ayoub.elbouinany99@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Commande passer ✔", // Subject line
        html :
     `<div> thank you mr <b> ${fullName}</b> <br> your welcome in this App <br>
     <p> La commande va passer :<a href='#'> Details </a> <h3> total quantity: ${totalQuantity} <br>
     total price: ${totalPrice}  ${cur} </h3>
      </div>`
          // html body
      });
   
  })
}


let UpdateQuantityDevises = async (req,res,next)=>{
    let {idDevise,quantity}=req.body;
 await Product.findAndUpdate(idDevise,quantity,function (err, d) {
    if (err) return next(err)
    res.json({d});
 })
}
   module.exports ={
    getAllCommande,getCommandeByUserId,getCommandeById,AddCommande,UpdateQuantityDevises
   }