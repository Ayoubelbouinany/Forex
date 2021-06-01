const User = require('../models/FrontOffice/User.module');
const jwt = require('jsonwebtoken');
var {ErrorHandler} = require('../midelleware/ErrorHandler')
// Register
let RegisterUser = function (req, res, next) {
    const { fullName, email, password} = req.body
   // LETS VALIDATE THE DATA BEFORE WE ADD A USER

  console.log(req.body);
  
    var newUser = new User({
      fullName: fullName,
      password: password,
      email: email
    });
    User.getUserByEmail(email, function (error, user) {
      if (error) return next(err)
      if (user) {
        let err = new ErrorHandler('signin error', 409, 'invalid_field', {
          message: "user is existed"
        })
        
        return next(err)
      }
       User.createUser(newUser, function (err, user) {
        if (err) return next(err);
      res.json({ message: 'user created' })
       });
    })
  }


  //Login 
  let Login = function (req, res, next) {
    const { email, password } = req.body.credential

    User.getUserByEmail(email, function (err, user) {
      if (err) return next(err)
      if (!user) {
        let err = new ErrorHandler('login error', 403, 'invalid_field', { message: "Incorrect email or password" })
        return next(err)
      }
      User.comparePassword(password, user.password, function (err, isMatch) {
        if (err) return next(err)
        if (isMatch) {
          let token = jwt.sign(
            { user: user },
            process.env.TOKEN_SUCRET,
            { expiresIn: '7d' }
          )
          res.status(201).json({
            user_token: {
              user_id: user.id,
              user_name: user.firstName + ' ' + user.lastName,
              token: token,
              expire_in: '7d'
            }
          })
        } else {
          let err = new ErrorHandler('login error', 403, 'invalid_field', { message: "Incorrect email or password" })
          return next(err)
        }
      })
    })
  }
let getUser = function(req,res,next){
  let {fullName}= req.params;
  User.getUserByFullName(fullName,function (err, user){
    if(err) return err;
    
    console.log(user);
    res.json({user:user});
    
  })
}
let UpdateUserSold = function(req,res,next) {
  let {fullName,newSold}= req.body;
  User.updateSoldUser(fullName,newSold,(err,update)=>{
    if(err) return err;
    console.log('Update avec success');
  })
}
  module.exports = {
      RegisterUser,Login,getUser,UpdateUserSold
  }