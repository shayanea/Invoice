var mongoose       = require('mongoose');
var Client         = require('../model/client');

module.exports = {
    GetClient : function(req, res){
        Client.find({'admin_id': req.decoded.sub},{'name':1, 'address':1, 'tel':1, '_id':1},function(err, result){
            if(err) throw err;
            else{
                res.status(200).send({
                    Data:result,
                    status:200
                });
            }
        })
    },
    AddClient : function(req, res){
        req.body.admin_id = req.decoded.sub;
        var client = new Client(req.body);

        Client.find({'admin_id': req.decoded.sub, 'tel': req.body.tel},function(err, result){
            if(err) throw err;
            else if(!result.length){
                client.save(function(err, data){
                    if(err){
                        res.status(500).send({
                            msg:err.message
                        });
                    }
                    else{
                        res.status(201).send({
                            message:"Client Add Succesfully"
                        });
                    }
                })
            }else{
                res.status(400).send({
                    msg:'client exist'
                });
            }
        })
    },
    RemoveClient : function(req,res){
        Client.findByIdAndRemove(req.query.id,function(err, result){
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
    EditClient : function(req,res){
        Client.findOneAndUpdate({ _id: req.body._id }, req.body, {upsert:true},function(err, result){
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
        Client.find({'name': new RegExp(req.query.name,'i')},{'name':1},function(err, result){
            if(err) throw err;
            res.send({
                Data:result
            });
        });
    }

};