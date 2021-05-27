

module.exports = function(req, res, next) {
  console.log(req.user);
  // if (!req.user.role == 1) return res.status(401).send("you are not admin ");

  // next();
  
};
