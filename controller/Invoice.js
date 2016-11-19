var mongoose     = require('mongoose');
var Invoice      = require('../model/invoice');

module.exports = {
    AddInvoice : function(req, res){

        req.body.admin_id = req.decoded.sub;

        var invoice = new Invoice(req.body);
        
        invoice.save(function(err, data){
            if(err){
                res.status(500).send({
                    msg:err.message
                });
            }
            else{
                res.status(201).send({
                    message:"invoice Add Succesfully"
                });
            }
        });
    },
    GetInvoice : function(req, res){
        Invoice.find({'admin_id': req.decoded.sub},{'admin_id':0, 'udpate_date':0, '__v':0, 'client_id':0, 'product_list':0},function(err, result){
            if(err) throw err;
            res.send({
                Data:result
            })
        });
    },
    GetInvoiceById : function(req, res){
        Invoice.findOne({'_id': req.query.id},{'admin_id':0, 'udpate_date':0, '__v':0},function(err, result){
            if(err) throw err;
            res.send({
                Data:result
            })
        });
    },
    EditInvoice : function(req, res){
        Invoice.findOneAndUpdate({ _id: req.body._id }, req.body, {upsert:true},function(err, result){
            if(err){
                res.send({
                    message:err.message
                });
            }else{
                res.status(200).send({
                    message:'update is done'
                });
            }
        });
    },
    RemoveInvoice : function(req, res){
        Invoice.findByIdAndRemove(req.query.id,function(err, result){
            if(err) throw err;
            res.status(204).send({
                message:'remove is done'
            });
        });
    }
};