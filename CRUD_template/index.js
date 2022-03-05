const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Item = require('./models/item');
const methodOverride = require('method-override');


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
// form request is used
app.use(express.urlencoded({extended:true})); // handling form request;
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy'];

// render all the items on the index.js
app.get('/items',  async (req, res) => {
    const {category} = req.query;
    if (category){
        const items = await Item.find({category})
        res.render('items/index', {items, category})
    }else{
        const items = await Item.find({})
        res.render('items/index', {items, category:'All'})
    }
    
})

// create new file form
app.get('/items/new', (req, res) => { 
    res.render('items/new', {categories})
})
app.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.redirect(`/items/${newItem._id}`)
})

// get single item
app.get('/items/:id', async (req, res) => {
    const {id} = req.params;
    Item.findById(id , function(err, item){
        if (err){
            console.log(err)
        }
        else{
            res.render('items/show', {item})
        }
    });

})
// Edit the item;
app.get('/items/:id/edit', async (req, res) => {
    const {id} = req.params;
    const item = await Item.findById(id);
    res.render('items/edit', {item, categories});
})
app.put('/items/:id', async (req, res) => {
    const {id} = req.params;
    const item = await Item.findByIdAndUpdate(id,  req.body, {runValidators: true, new:true});
    res.redirect(`/items/${item._id}`)
})

app.delete('/items/:id', async(req, res) => {
    const {id} = req.params;
    const deleteItem = await Item.findByIdAndDelete(id);
    res.redirect('/items')  
})


app.listen(3000, () => {
    console.log("App is listening...");
})