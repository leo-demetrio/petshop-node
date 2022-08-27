'use strict'

exports.get = (req,res) => {
    res.status(200).send({
        title: "Page index product",
        version: "0.0.1"
    });
};

exports.post = (req, res) => {
    res.status(201).send(req.body);
};

exports.put = (req, res) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};
exports.delete = (req, res) => {
    res.status(200).send(req.body);
};