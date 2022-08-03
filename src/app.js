'use strict'
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

mongoose.connect(`mongodb+srv://petshop_leop:mongopetshop@cluster0.rahrifh.mongodb.net/?retryWrites=true&w=majority`)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;