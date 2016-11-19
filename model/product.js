var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var moment       = require('moment-jalaali');

// PRODUCT SCHEMA FOR MONGODB
var ProductSchema = new Schema({
    'admin_id': { type:String, required: true },
    'name': { type:String, required: true },
    'price': { type:Number, required: true},
    'number': { type:Number, required: true },
    'serial_number': { type:String },
    'desc': { type:String }
});

// BEFORE SAVE NEW PRODUCT UPDATE DATE 
ProductSchema.pre('save',function(next){
    var currentDate = moment().format('jYYYY/jM/jD HH:mm:ss');

    this.updated_at = currentDate;

    next();
});

var Product = mongoose.model('Product',ProductSchema);

module.exports = Product;