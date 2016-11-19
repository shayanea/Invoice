var jwt    		 = require('jsonwebtoken');
var config 		 = require('../config');
var User         = require('../model/user');
var moment       = require('moment');
var passwordHash = require('password-hash');

module.exports = function (req, res) {
	// FIND USER BY EMAIL
	User.findOne({
		email:req.body.email
	},function(err, user){
		if(err) throw err;

		// IF NOT FOUND USER SEND CLIENT 400 HEADER STATUS
		if(!user){
			res.status(404).send({
				message:"کاربر با این مشخصات موجود نیست.",
				status:404
			});
		// IF USER EXIST CHECK HASHED PASSWORD
		}else if(user){
			// IF PASSWORD DOESN'T MATCH
			if(!passwordHash.verify(req.body.password, user.password)){
				res.status(400).send({
					message:"رمز عبور شما اشتباه است.",
					status:400
				});
			}else{
				// IF EVERYTHING IS OK PASS TOKEN
				var token = CreateToken(user,config.secret);
				res.send({
					message:"You Login Successfully",
					Token:token,
					status:200
				})
			}
		}
	})
};

// CREATE TOKEN BY CUSTOME PAYLOAD AND SECRET KEY
function CreateToken(user,secret){
	var payload = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(1,"days").unix()
	}
	return jwt.sign(payload,secret);
}