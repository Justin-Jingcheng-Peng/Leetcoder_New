const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// render all the items on the index.js
app.get('/products',  async (req, res) => {
    const products = await Product.find({})
    console.log(products)
    res.render('products/index', {products})
})
// get single item
app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product =  await Product.findById(id) // Product.findByID will return a promise, the program will pause at line 28 until this promise is being resolved;
    res.render('products/show', {product});
})
app.get('/products/new', (req, res) => {
    res.render('products/new')
})


app.listen(3000, () => {
    console.log("App is listening...");
})
