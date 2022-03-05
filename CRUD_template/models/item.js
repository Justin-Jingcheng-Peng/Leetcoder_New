const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    category:{
        type: String,
        enum: ['easy', 'medium', 'hard']
    }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;