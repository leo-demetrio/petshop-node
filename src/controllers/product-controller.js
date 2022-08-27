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
    repository
        .getById(req)
        .then(data => {
            console.log("foi")
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
};
exports.getBySlug = (req,res) => {
    repository
        .getBySlug(req)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
};
exports.getByTag = (req,res) => {
    repository
        .getByTag(req)
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
    
    repository
        .create(req.body)
        .then(x => {
            res.status(201).send({ message: 'Product save success'});
        })
        .catch(e => {
            res.status(400).send({ message: 'Product unsave', data: e});
        });
};

exports.put = (req, res) => {
    repository
        .update(req)
        .then(x => {
            res.status(200).send({ message: 'Product update success'});
        })
        .catch(e => {
            res.status(400).send({ message: 'Product unsave', data: e});
        });
};
exports.delete = (req, res) => {
    repository
        .remove(req)
        .then(x => {
            res.status(200).send({ message: 'Product removed success'});
        })
        .catch(e => {
            res.status(400).send({ message: 'Product no removed', data: e});
        });
};