var jwt    = require('jsonwebtoken');
var config = require('../config');


module.exports = function(req, res, next) {

  
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    var token = req.headers.authorization.split(' ')[1];
    if(token){
       jwt.verify(token, config.secret, function(err, decoded) {      
        if (err) {
          return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    }
  } else {
    return res.status(401).json({ success: false, message: 'no token' });
  }
}