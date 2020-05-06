const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static('public'));
app.use(express.static('images'));

app.set('view engine', 'ejs');
app.set('views', 'views');

let contents = fs.readFileSync('animals.json');
let parsedContents = JSON.parse(contents);

app.get('/', function(req, res) {
    res.render('Animals', {
        animalSound: 'Hello, world!'
    });
});

app.get('/cats', function(req, res) {
    res.render('Animals', {
        animalSound: 'Meow'
    });
});

app.get('/dogs', function(req, res) {
    res.render('Animals', {
        animalSound: "Woof"
    });
});

app.get('/cats_and_dogs', function(req, res) {
    res.render('Animals', {
        animalSound: 'Living'
    });
});

app.get('/greet/:name', function(req, res) {
    res.render('Greet', {
        name: req.params.name
    });
});

app.get('/year', function(req, res) {
    res.render('Query', {
        age: req.query.age
    });
});

app.get('/pets-cats', function(req, res) {
    res.render('pets', {
        imageURL: parsedContents[0].image,
        requestURL: req.url,
        name: parsedContents[0].name,
        description: parsedContents[0].description
    });
});

app.get('/pets-dogs', function(req, res) {
    res.render('pets', {
        imageURL: parsedContents[2].image,
        requestURL: req.url,
        name: parsedContents[1].name,
        description: parsedContents[1].description
    });
});

app.get('/pets-home', function(req, res) {
    res.render('home', {
        parsedContents: parsedContents
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
})