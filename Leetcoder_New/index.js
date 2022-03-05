const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Question = require('./models/question');
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
app.use(express.static(path.join(__dirname, 'public')))

const categories = ['easy', 'medium', 'hard'];

// render all the questions on the index.js
app.get('/questions',  async (req, res) => {
    const {category} = req.query;
    if (category){
        const questions = await Question.find({category})
        res.render('questions/index', {questions, category})
    }else{
        const questions = await Question.find({})
        res.render('questions/index', {questions, category:'All'})
    }
    
})

// create new file form
app.get('/questions/new', (req, res) => { 
    res.render('questions/new', {categories})
})
app.post('/questions', async (req, res) => {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.redirect(`/questions/${newQuestion._id}`)
})

// get single question
app.get('/questions/:id', async (req, res) => {
    const {id} = req.params;
    Question.findById(id , function(err, question){
        if (err){
            console.log(err)
        }
        else{
            res.render('questions/show', {question})
        }
    });

})
// Edit the question;
app.get('/questions/:id/edit', async (req, res) => {
    const {id} = req.params;
    const question = await Question.findById(id);
    res.render('questions/edit', {question, categories});
})
app.put('/questions/:id', async (req, res) => {
    const {id} = req.params;
    const question = await Question.findByIdAndUpdate(id,  req.body, {runValidators: true, new:true});
    res.redirect(`/questions/${question._id}`)
})

app.delete('/questions/:id', async(req, res) => {
    const {id} = req.params;
    const deleteQuestion = await Question.findByIdAndDelete(id);
    res.redirect('/questions')  
})


app.listen(3000, () => {
    console.log("App is listening...");
})