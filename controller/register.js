var mongoose     = require('mongoose');
var jwt    		 = require('jsonwebtoken');
var config 		 = require('../config');
var User         = require('../model/user');
var moment       = require('moment');

module.exports = function (req, res) {
	// CREATE NEW SCHEMA USER
	var user = new User(req.body);

	// FIND USER BY EMAIL
	User.find({ email: req.body.email }, function(err, data) {
		if (err){
			throw err;	
		} 
		// IF USER DOESN'T EXIST SAVE IT
		else if(!data.length){
			user.save(function (err, result){
				if(err){
					res.status(500).send({
						msg:err.message,
						status:500
					});
				}else{
					// ADD NEW USER AND CREATE NEW TOKEN
					var token = CreateToken(user,config.secret)
					res.status(201).send({
						message:"User Register Succesfully",
						Token:token,
						status:201
					});
				}
			});
		}else{
			// IF USER EXIST PASS 400 HEADER STATUS TO CLIENT
			res.status(400).send({
				message:"کاربر با این مشخصات موجود است.",
				status:400
			});
		}
	}); 
}

// CREATE TOKEN WITH CUSTOME PAYLOAD AND SECRET KEY
function CreateToken(user,secret){
	var payload = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(24,"hours").unix()
	}
	return jwt.sign(payload,secret);
}