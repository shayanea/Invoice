var mongoose     = require('mongoose');
var User         = require('../model/user');
var moment       = require('moment');

module.exports = {
	// GET USER INFORMATION
	GetProfile: function (req, res){
		User.findOne({ _id: req.decoded.sub },{'email':1, 'tel':1,'_id':0, 'fname':1, 'lname':1, 'image':1})
		.exec(function(err, user){
			if (err) throw err;
			res.send({
				Data:user
			})
		});
	},
	// EDIT USER INFORMATION
	EditProfile: function(req, res, next){
		var form = {
			body: req.body,
			file: req.file
		}
		var file = form.file
		, filedata = file

		if(typeof filedata == "undefined"){
			var query = { fname: req.body.fname, lname: req.body.lname};
		}else{
			if(require('fs').statSync(filedata.path).isFile()) {
				var query = { fname: req.body.fname, lname: req.body.lname, image:filedata.filename};
			}
			else {
				return res.status(404).send("File not found")
			}
		}
		
		User.findByIdAndUpdate({_id:req.decoded.sub},query,{upsert:true},function(err, result){
			if(err) throw err;
			res.status(204).send({
				message:'edit is done'
			});
		});
	}
}