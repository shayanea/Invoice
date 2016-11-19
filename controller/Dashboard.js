var mongoose     = require('mongoose');
var Invoice      = require('../model/invoice');
var Client       = require('../model/client');
var Product      = require('../model/product');
var Global = {
    product:0,
    client:0,
    invoice:0
}

module.exports = {
    Get : function(req, res){
        Client.count({'admin_id': req.decoded.sub}, function(err, count){
            if(err) throw err;
            Global['client'] = count;

            Invoice.count({'admin_id': req.decoded.sub}, function(err, count){
                if(err) throw err;
                Global['invoice'] = count; 

                Product.count({'admin_id': req.decoded.sub}, function(err, count){
                    if(err) throw err;
                    Global['product'] = count; 

                    Invoice
                    .find({'admin_id': req.decoded.sub},{'admin_id':0, 'udpate_date':0, '__v':0, 'client_id':0, 'product_list':0})
                    .limit(20)
                    .exec(function(err, result) {
                        if(err) throw err;
                        res.send({
                            Stats:Global,
                            Data:result
                        });
                    });
                });
            }); 
        });
    }
}