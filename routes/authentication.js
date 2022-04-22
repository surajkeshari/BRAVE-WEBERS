const express=require(`express`);
const router= express.Router();
const passport = require(`passport`);

const Users = require(`../models/user`);
const Items = require(`../models/catalogItems`);
const restUsers = require(`../models/restaurant`);
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


// Registering
router.post('/userSignup', (req, res) => {
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



        // var firstname = req.body.fname;
        // var firstname = req.body.name;
        // // var lastname = req.body.lname;
        // var email = req.body.email;
        // var contact_no =  req.body.contact_no;

        // console.log(firstname,lastname,email);
    
    
        // this is the javascript object
        // var data = {
        //     members: [
        //         {
        //             email_address: email,
        //             status: "subscribed",
        //             merge_fields: {
        //                 FNAME: firstname,
        //                 // LNAME: lastname
        //                 PHONE: contact_no
        //             }
        //         }
    
        //     ]
        // }
    
        // var jsondata = JSON.stringify(data);
    
    
        // var options = {
        //     url: 'https://us5.api.mailchimp.com/3.0/lists/07c7d2980a',
        //     method: "POST",
        //     // authorization is case sensitive 
        //     headers: {
        //         "Authorization": "keshariya d1fd67a2b01e1bfeb99110d697fc2c90-us5"
        //     },
        //     body: jsondata
        // };
    
        // request(options, function (error, responce, body) {
        //     if (error) {
        //         // console.log(error);
        //         res.send("there was an error with signing up,please try again");
        //         // res.sendFile(__dirname + "/failure.html")
        //     } else {
        //         //   console.log(responce.statusCode);  
        //         if (Response.status === 200) {
        //             res.send("Succesfully SigningUp!");
        //         }else{
        //             res.send("there was an error with signing up,please try again");
        //         }
        //     }
    
        // });

})

router.post('/restSignup', (req, res) => {
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
router.post('/userLogin', (req, res) => {
    let user = new Users({
        email: req.body.email,
        password: req.body.password
    })

    req.logIn(user, (err) => {
        if (err) {
            console.log(err);
        }
        passport.authenticate('userLocal')(req, res, () => {
            Users.findOne({email:user.email},(err,user)=>{
                
                res.redirect(`/userpage/${user._id}`);
            })
        })
    })
})


router.post('/restLogin', (req, res) => {
    let user = new restUsers({
        email: req.body.email,
        password: req.body.password
    })

    req.logIn(user, (err) => {
        if (err) {
            console.log(err);
        }
        passport.authenticate('restLocal')(req, res, () => {
            restUsers.findOne({email:user.email},(err,restUser)=>{
                res.redirect(`/restUser/${restUser.id}`)
            })

        })
    })
})

module.exports= router;