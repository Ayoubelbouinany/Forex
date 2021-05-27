var mongoose = require('mongoose');
const { Str } = require('prelude-ls');
var productSchema = mongoose.Schema({
  title: {
    type: String,
    index:true
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  quantity: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now()
  },
  vendeur:{
    type:String,
  }
});

var Product = module.exports = mongoose.model('Product', productSchema);

module.exports.getAllProducts = function (v,callback) {
  Product.find({'vendeur': {$ne:v}},callback)
}








module.exports.getProductByID = function (id, callback) {
  Product.findById(id, callback);
}


module.exports.addProduct = function (newProduct, callback) {
  newProduct.save(callback);
}

module.exports.deleteProductById=function(id,callback){
  Product.findByIdAndRemove(id,callback);
}

module.exports.updateProduct = function(id,ProductUpdate,callback) {
  Product.findByIdAndUpdate(id,{$set:ProductUpdate},callback);
}

module.exports.removeAllProduct = function(callback) {
  Product.remove({},callback);
}

module.exports.findAndUpdate = function(name,qty,callback) {
  Product.updateOne({title: name},{$inc:{quantity:-qty}},callback);
}

