var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var passwordHash = require('password-hash');
var moment       = require('moment-jalaali');

// USER SCHEMA FOR MONGODB
var UserSchema = new Schema({
	fname : { type: String, required: true },
	lname : { type: String, required: true },
	email : { type: String, required: true, unique: true },
	tel :  { type: String, required: true },
	password :  { type: String, required: true },
	image : { data: Buffer, contentType: String},
	admin:  { type: Boolean },
	setting: {
		'name':String,
		'address':String,
		'tel':String	
	},
	created_at: { type: String, default: moment().format('jYYYY/jM/jD HH:mm:ss') },
  	updated_at: { type: String }
});

// BEFORE SAVE NEW USER UPDATE DATE 
UserSchema.pre('save', function(next) {
  var currentDate = moment().format('jYYYY/jM/jD HH:mm:ss');

  this.updated_at = currentDate;

  this.password = passwordHash.generate(this.password);

  next();
});

var User = mongoose.model('User',UserSchema);

module.exports = User;