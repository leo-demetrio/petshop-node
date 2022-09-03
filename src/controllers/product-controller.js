'use strict'

const ValidatorContract = require('../validators/fluent-validators');
const repository = require('../repositories/product-repository');


exports.get = async(req,res) => {  
    try{
        var data = await repository.get();        
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({ message: 'Fail loading products'})
    }
   
};
exports.getById = async(req,res) => {
    try{
        var data = await repository.getById(req); 
        console.log(data)      
        res.status(200).send(data);    
    }catch(e){
        res.status(400).send(e);
    }
};
exports.getBySlug = async(req,res) => {
    try{
        var data = await repository.getBySlug(req);
        res.status(200).send(data);
    }catch(e){
        res.status(400).send(e);
    }
};
exports.getByTag = async(req,res) => {
    try{
        var data = await repository.getByTag(req);
        res.status(200).send(data);
    }catch(e){
        res.status(400).send(e);
    }
};

exports.post = async(req, res) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.title, 3, "Title length min 3 caracters");
    contract.hasMinLen(req.body.slug, 3, "Slug length min 3 caracters");
    contract.hasMinLen(req.body.description, 3, "Description length min 3 caracters");
    if(!contract.isValid()) return res.status(400).send(contract.errors()).end();
    
    try{
        var data = await repository.create(req.body);
        res.status(201).send({ message: 'Product save success'});
    }catch(e){
        res.status(400).send({ message: 'Product unsave', data: e});
    }
};

exports.put = async(req, res) => {
    try {
        var data = await repository.update(req);
        res.status(200).send({ message: 'Product update success'});
    }catch(e){
        res.status(400).send({ message: 'Product unsave', data: e});
    };
};
exports.delete = async(req, res) => {
    try{
        var data = await repository.remove(req);
        res.status(200).send({ message: 'Product removed success'});
    }catch(e) {
        res.status(400).send({ message: 'Product no removed', data: e});
    }
};