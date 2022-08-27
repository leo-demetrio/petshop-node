'use strict'

const mongoose = require("mongoose");
const Product = mongoose.model('Product');
const ValidatorContract = require('../validators/fluent-validators');
const repository = require('../repositories/product-repository');


exports.get = (req,res) => {
    repository
        .get()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
};
exports.getById = (req,res) => {
    Product  
        .findOne({ 
            _id: req.params.id,
            active: true
        }, 'title price slug tags')
        .then(data => {
            console.log("foi")
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
};
exports.getBySlug = (req,res) => {
    Product  
        .findOne({ 
            slug: req.params.slug,
            active: true
        }, 'title price slug tags')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
};
exports.getByTag = (req,res) => {
    Product  
        .findOne({ 
            tags: req.params.tag,
            active: true
        }, 'title price slug tags')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
};

exports.post = (req, res) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.title, 3, "Title length min 3 caracters");
    contract.hasMinLen(req.body.slug, 3, "Slug length min 3 caracters");
    contract.hasMinLen(req.body.description, 3, "Description length min 3 caracters");
    if(!contract.isValid()) return res.status(400).send(contract.errors()).end();
    
    var product = new Product(req.body);
    product
        .save()
        .then(x => {
            res.status(201).send({ message: 'Product save success'});
        })
        .catch(e => {
            res.status(400).send({ message: 'Product unsave', data: e});
        });
};

exports.put = (req, res) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            }
        })
        .then(x => {
            res.status(200).send({ message: 'Product update success'});
        })
        .catch(e => {
            res.status(400).send({ message: 'Product unsave', data: e});
        });
};
exports.delete = (req, res) => {
    Product
        .findByIdAndRemove(req.body.id)
        .then(x => {
            res.status(200).send({ message: 'Product removed success'});
        })
        .catch(e => {
            res.status(400).send({ message: 'Product no removed', data: e});
        });
};