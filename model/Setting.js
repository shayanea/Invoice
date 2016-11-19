var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var moment       = require('moment-jalaali');

// SETTING SCHEMA FOR MONGODB
var SettingSchema = new Schema({
	admin_id :{ type:String },
	name : { type: String },
	address : { type: String },
	tel : { type: String },
});


var Setting = mongoose.model('Setting',SettingSchema);

module.exports = Setting;