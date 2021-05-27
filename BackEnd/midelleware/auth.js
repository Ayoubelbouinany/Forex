const jwt = require("jsonwebtoken");
const {ErrorHandler} = require('./ErrorHandler')

function ensureAuthenticated(req, res, next) {

   let token = req.headers['auth-token'] || req.headers['authorization']
  
  if (!token) {
    let err = new ErrorHandler('token', 401, {
      message: "Token is not supplied"
    })
    return next(err)
  }
  try{
    let verifyToken = jwt.verify(token,process.env.TOKEN_SUCRET);
    req.user=verifyToken;
    next();
  }catch(error){
    let err = new ErrorHandler('token', 401, {
      message: "Token is not valid"
    })
    return next(err)
  }
}

module.exports = ensureAuthenticated