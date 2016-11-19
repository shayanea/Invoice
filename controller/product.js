var mongoose     = require('mongoose');
var Product = require('../model/product');

module.exports = {
    GetProduct : function(req, res){
        Product.find({'admin_id': req.decoded.sub},{'name':1, 'number':1, 'price':1, 'serial_number':1, 'desc':1},function(err, result){
            if(err) throw err;
            else{
                res.send({
                    Data:result,
                    status:200
                });
            }
        })
    },
    AddProduct : function(req, res){
        req.body.admin_id = req.decoded.sub;
        var product = new Product(req.body);

        Product.find({'admin_id': req.decoded.sub, 'name': req.body.name, 'serial_number': req.body.serial_number},function(err, result){
            if(err) throw err;
            else if(!result.length){
                product.save(function(err, data){
                    if(err){
                        res.status(500).send({
                            msg:err.message,
                            status:500
                        });
                    }
                    else{
                        res.send({
                            message:"Product Add Succesfully",
                            status:201
                        });
                    }
                })
            }else{
                res.status(400).send({
                    msg:'product exist'
                });
            }
        })
    },
    RemoveProduct : function(req,res){
        Product.findByIdAndRemove(req.query.id,function(err, result){
            if(err){
                res.send({
                    message:err.message
                });
            }else{
                res.status(204).send({
                    message:'remove is done'
                });
            }
        });
    },
    EditProduct : function(req,res){
        Product.findOneAndUpdate({ _id: req.body._id }, req.body, {upsert:true},function(err, result){
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
    Suggest : function(req, res){
        console.log(req.query);
        Product.find({'name': new RegExp(req.query.name,'i')},{'name':1, 'price':1},function(err, result){
            if(err) throw err;
            res.send({
                Data:result
            });
        });
    }
}