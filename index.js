const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require(`path`);
///////////////////////////////
const bodyParser = require("body-parser");
const request = require("request");

//////
const passport = require(`passport`);
const session = require(`express-session`);
const passportLocalMongoose = require(`passport-local-mongoose`);
/////
const restRoutes=require(`./routes/restRoutes`);
const userRoutes= require(`./routes/userRoutes`);
const authRoutes= require(`./routes/authentication`);
const app = express();



app.use(express.static('static'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.set(`views`, path.join(__dirname, `views`));
////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: true }));

///////////////////
app.use(session({
    secret: 'kaustubhssecret',
    resave: false,
    saveUninitialized: false,

}))

app.use(passport.initialize());
app.use(passport.session());
// before connection to database////////

mongoose.connect('mongodb://localhost:27017/SmartRestaurant', { useNewUrlParser: true });
db = mongoose.connection;
db.once('open', () => {
    console.log("Connected to Mongo");
})
db.on('error', () => {
    console.log("Error in connection to Mongo");
})


// Home route
app.get('/', (req, res) => {
    res.render(`home`);
})


//get requests
app.get(`/userSignup`, (req, res) => {
    res.render(`signup`);
})
app.get(`/userLogin`, (req, res) => {
    res.render(`login`);
})

app.get(`/contact`, (req, res) => {
    res.render(`contact`);
})

////////////////////////////////////////
app.get(`/about`, (req, res) => {
    if (req.isAuthenticated()) {
        res.render(`about`);
    } else {
        res.redirect('/');
    }
})

//Restaurant Routes
app.use(restRoutes);

//User routes
app.use(userRoutes);

//Authentication routes
app.use(authRoutes);

app.listen(5000, () => {
    console.log("Server running on 5000");
})