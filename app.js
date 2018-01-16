const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const initApi = require('./routes');


const app = express();
  
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

initApi(app);

function loginCheckMiddleware(req, res, next) {
    if (req.session.user) {
        res.redirect('/home');
    } else {
        next();
    }
}


app.get('/', (req, res) => {
    console.log('request');
    if (req.session.views) {
        req.session.views++
      } else {
        req.session.views = 1
      }
    res.render('home', {
        user: 'Bob',
        age: 25,
        title: 'home',
        views: req.session.views,
        params: {
            a: 'aa'
        }
    });
});

app.get('/users/add', (req, res) => {
    res.render('addUser');
});

app.get('/home', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        res.render('userHome', { user: req.session.user });
    }
});

app.get('/login',loginCheckMiddleware, (req,res) => {
    const errors = Object.assign({}, req.session.errors);
    req.session.errors = null;
    res.render('login', { errors });
});

app.get('/signup',loginCheckMiddleware, (req, res) => {
    const errors = Object.assign({}, req.session.errors);
    req.session.errors = null;
    res.render('signUp', { errors });
});

const users = [

];

// Auth


app.post('/signup', (req, res) => {
    req.checkBody('username').notEmpty().withMessage('username is required');
    req.checkBody('password').notEmpty().withMessage('password is required').equals(req.body['r-password']).withMessage('passwords must be equal');

    const errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        res.redirect('/signup');
    } else {
        users.push({
            username: req.body.username,
            password: req.body.password,
        });
        req.session.user = req.body.username;
        req.session.errors = null;
        res.redirect('/home');
    }
});

app.post('/login', (req, res) => {
    req.checkBody('username').notEmpty().withMessage('username is required');
    req.checkBody('password').notEmpty().withMessage('password is required');

    const errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        res.redirect('/login');
    } else {
        const user = users.find((user) => user.username === req.body.username && user.password === req.body.password);
        if (!user) {
            req.session.errors = [{
                msg: 'wrong username or password',
            }];
            res.redirect('/login');
        } else {
            req.session.user = user.username;
            req.session.errors = null;
            res.redirect('/home');
        }
    }
});

app.post('/signout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Auth

app.get('/api/user', (req, res) => {
    res.json({
        username: req.cookies.username,
    });
});


app.use((req, res, next) => {
    console.log('request');
    next();
});

app.listen(3000, () => {
    console.log('server started')
});