
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/signupLoginDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
}));

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});

app.post('/signup', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    newUser.save()
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/signup');
        });
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user && user.password === req.body.password) {
                req.session.user = user;
                res.redirect('/index.html');
            } else {
                res.redirect('/login');
            }
        });
});

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
