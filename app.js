const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');

const app = express();
  
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

app.get('/', (req, res) => {
    console.log('request');
    res.render('home', {
        user: 'Bob',
        age: 25,
        title: 'home',
        params: {
            a: 'aa'
        }
    });
});

app.get('/users/add', (req, res) => {
    res.render('addUser');
})

const users = [
{
    name: 'Bob'
}
];

app.get('/api/user', (req, res) => {
    res.json({
        name: 'John',
    });
});

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.get('/api/users/:userId', (req, res) => {
    res.send(req.query.c);
});

app.post('/api/users/add', (req, res) => {
    req.checkParams('name').notEmpty().withMessage('Name is required');
    const errors = req.validationErrors();
    console.log(errors)
    if (errors) {
        res.render('addUser', {
            errors,
        });
    } else {
        const name = req.body.name;
        users.push({
            name,
        });
        res.json({
            name,
        });
    }
});

app.use((req, res, next) => {
    console.log('request');
    next();
});

app.listen(3000, () => {
    console.log('server started')
});