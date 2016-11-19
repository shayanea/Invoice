var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var moment       = require('moment-jalaali');

// CLIENT SCHEMA FOR MONGODB
var ClientSchema = new Schema({
    'name': { type:String, required: true},
    'admin_id': { type:String, required: true },
    'address': { type:String, required: true },
    'tel': { type:String, required: true },
    'create_at': { type:String, default : moment().format('jYYYY/jM/jD HH:mm:ss') },
    'update_at': { type:String }
});

// BEFORE SAVE NEW CLIENT UPDATE DATE 
ClientSchema.pre('save',function(next){
    var currentDate = moment().format('jYYYY/jM/jD HH:mm:ss');

    this.updated_at = currentDate;

    next();
});

var Client = mongoose.model('Client',ClientSchema);

module.exports = Client;