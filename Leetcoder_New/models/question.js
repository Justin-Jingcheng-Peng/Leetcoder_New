const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    time:{
        type: Number,
        required: true,
        min: 0
    },
    category:{
        type: String,
        enum: ['easy', 'medium', 'hard']
    }
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;