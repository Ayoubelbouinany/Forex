const { Double } = require('bson');
var mongoose = require('mongoose');

var commandeSchema = mongoose.Schema({
  User: {
    type: String
  },
  date: {
    type: Date,
    default:Date.now
  },
  totalPrice: {
    type: Number
  },
  totalQuantity: {
    type: Number
  }
});

var Commande = module.exports = mongoose.model('Commande', commandeSchema);

module.exports.getAllCommandes = function (callback) {
  Commande.find(callback)
}

//get commande by id
module.exports.getCommandeById = function (id,callback) {
  Commande.findById(id,callback)
}

//get commande by Userid
module.exports.getCommandeByUserId = function (idU,callback) {
  Commande.find({idUser:idU},callback)
}

//remove commande
module.exports.deleteCommande = function (id,callback) {
  Commande.findByIdAndRemove(id,callback)
}

//remove All commande
module.exports.removeAllCommande = function (callback) {
  Commande.remove({},callback)
}
//add commande
module.exports.addCommande= function(newCommande , callback){
  newCommande.save(callback);
}
//modifier Panier
module.exports.updateCommande = function (id,commandeUpdate,callback) {
  Commande.findByIdAndUpdate(id,{$set:commandeUpdate},callback)
}