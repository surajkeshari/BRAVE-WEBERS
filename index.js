const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require(`path`);

//////
const passport = require(`passport`);
const session = require(`express-session`);
const passportLocalMongoose = require(`passport-local-mongoose`);
/////

const app = express();



app.use(express.static('static'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.set(`views`, path.join(__dirname, `views`));

///////////////////
app.use(session({
    secret: 'kaustubhssecret',
    resave: false,
    saveUninitialized: false,

}))

app.use(passport.initialize());
app.use(passport.session());
// before connection to database////////

mongoose.connect('mongodb://localhost:27017/SmartRestraunt', { useNewUrlParser: true });
db = mongoose.connection;
db.once('open', () => {
    console.log("Connected to Mongo");
})
db.on('error', () => {
    console.log("Error in connection to Mongo");
})
const Users = require(`./models/user`);
const restUsers = require(`./models/restaurant`);
passport.use('userLocal', Users.createStrategy());
passport.use('restLocal', restUsers.createStrategy());
// passport.serializeUser(Users.serializeUser());
// passport.deserializeUser(Users.deserializeUser());
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    if (user != null)
        done(null, user);
});

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

app.get(`/restSignup`, (req, res) => {
    res.render(`signup(r)`);
})

app.get(`/restLogin`, (req, res) => {
    res.render(`login(r)`);
})


////////////////////////////////////


app.get(`/about`, (req, res) => {
    res.render(`about`);
})
app.get(`/contact`, (req, res) => {
    res.render(`contact`);
})

////////////////////////////////////////
app.get(`/about`, (req, res) => {
    if (req.isAuthenticated()) {
        res.render(`about`);
    } else {
        res.redirect('/home');
    }
})



// Registering
app.post('/userSignup', (req, res) => {
    let user = new Users({
        name: req.body.name,
        email: req.body.email,
        contact_no: req.body.contact_no
    })
    Users.register(user, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }
        passport.authenticate(`userLocal`)(req, res, () => {
            res.redirect(`/userLogin`);

        })
    })
})


app.post('/restSignup', (req, res) => {
    let restUser = new restUsers({
        name: req.body.name,
        email: req.body.email,
        contact_no: req.body.contact_no,
        address: req.body.address
    })
    restUsers.register(restUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }
        passport.authenticate(`restLocal`)(req, res, () => {
            res.redirect(`/restLogin`);

        })
    })
})


//Login
app.post('/userLogin', (req, res) => {
    let user = new Users({
        email: req.body.email,
        password: req.body.password
    })

    req.logIn(user, (err) => {
        if (err) {
            console.log(err);
        }
        passport.authenticate('userLocal')(req, res, () => {
            res.redirect(`/about`);
        })
    })
})


app.post('/restLogin', (req, res) => {
    let user = new restUsers({
        email: req.body.email,
        password: req.body.password
    })

    req.logIn(user, (err) => {
        if (err) {
            console.log(err);
        }
        passport.authenticate('restLocal')(req, res, () => {
            res.redirect(`/about`);
        })
    })
})






app.listen(3000, () => {
    console.log("Server running on 3000");
})