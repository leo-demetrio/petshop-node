'use strict'
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//connection mongo
mongoose.connect('mongodb+srv://petshop_leop:mongopetshop@cluster0.rahrifh.mongodb.net/?retryWrites=true&w=majority');
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);

module.exports = app;