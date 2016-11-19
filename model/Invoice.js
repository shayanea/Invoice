var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var moment       = require('moment-jalaali');

// INVOICE SCHEMA FOR MONGODB
var InvoiceSchema = new Schema({
    'admin_id': { type:String, required: true },
    'create_date' : {type:String , default : moment().format('jYYYY/jM/jD HH:mm:ss')},
    'udpate_date' : {type:String},
    'payment_type': {type:String},
    'status' : {type:Boolean, default : false},
    'description' :{type:String},
    'total' :{type:Number, required: true},
    'client_name' :{ type:String, required : true},
    'client_id' :{ type:String},
    'product_list' : {type:Array}
});

// BEFORE SAVE NEW INVOICE UPDATE DATE 
InvoiceSchema.pre('save',function(next){
    var currentDate = moment().format('jYYYY/jM/jD HH:mm:ss');
    this.updated_at = currentDate;
    next();
});

var Invoice = mongoose.model('Invoice',InvoiceSchema);

module.exports = Invoice;