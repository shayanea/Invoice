var mongoose     = require('mongoose');
var Setting      = require('../model/setting');

module.exports = {
    GetSetting: function(req, res){
		Setting.findOne({admin_id:req.decoded.sub},function(err, result){
			if(err) throw err;
			res.status(200).send({
				Data:result
			})
		});
	},
    EditSetting: function(req, res){
		Setting.findByIdAndUpdate({_id:req.decoded.sub},req.body,{upsert:true},function(err, result){
			if(err) throw err;
			res.status(204).send({
				message:'edit is done'
			})
		});
	}
}