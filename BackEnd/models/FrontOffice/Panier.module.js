var mongoose = require('mongoose');

var panierSchema = mongoose.Schema({
  items: {
    type: Object
  },
  totalQty: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  user: {
    type: String
  }
});

var Panier = module.exports = mongoose.model('Panier', panierSchema);
//get all product from panier
module.exports.getPanierByUserId = function (user, callback) {
  let query = { user: user }
   Panier.find(query, callback)
}

module.exports.getPanierById = function (id, callback) {
  Panier.findById(id, callback)
}

module.exports.updatePanierByUserId = function (user, newPanier, callback) {
  let query = { user: user }
  Panier.find(query, function (err, p) {
    if (err) throw err

    //exist cart in databse
    if (p.length > 0) {
      Panier.findOneAndUpdate(
        { user: user },
        {
          $set: {
            items: newPanier.items,
            totalQty: newPanier.totalQty,
            totalPrice: newPanier.totalPrice,
            user: user
          }
        },
        { new: true },
        callback
      )
    } else {
      //Panier Not in database
      newPanier.save(callback)
    }
  })
}

module.exports.updatePanierByPanierId = function (user, newPanier, callback) {
  Panier.findById(
    { user: user },
    {
      $set: newPanier
    },
    callback
  )
}



module.exports.createPanier = function (newPanier, callback) {
  newPanier.save(callback)
}