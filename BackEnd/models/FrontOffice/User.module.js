
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const { number } = require('joi');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        index: true
    },
    password: {
        type: String
    }, 
     fullName: {
        type: String
    },
    date_creation:{
        type:Date,
        default:Date.now
    },
    sold:{
        type:Number,
        default:100
    }
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByEmail = function (email, callback) {
    var query = { email: email };
    User.findOne(query, callback);
}

module.exports.getUserByFullName = function (name, callback) {
    var query = { fullName: name  };
    User.findOne(query, callback);
}
module.exports.getUserByStatus = function (status, callback) {
    var query = { status: status };
    User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}
module.exports.comparePassword = function (givenPassword, hash, callback) {
    bcrypt.compare(givenPassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.getAllUsers = function (callback) {
    User.find(callback)
}


module.exports.updateSoldUser = function (fullName,newSold,callback) {
    let query= { fullName: fullName }
    User.findOneAndUpdate(query,{$set:{
        sold:newSold
    }},callback)
}