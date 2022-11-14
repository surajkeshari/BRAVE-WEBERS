const express = require('express');
const router= express.Router();
const Users = require(`../models/user`);
const Items = require(`../models/catalogItems`);
const restUsers = require(`../models/restaurant`);

//Get homepage of user
router.get(`/userpage/:id`,(req,res)=>{
    restUsers.find({}).then((restUsers)=>{
        Users.findById(req.params.id,(err,user)=>{
            if(err){
                console.log(err);
            }
            res.render(`userPage`,{restUsers:restUsers,user:user});
        })
    })
 })

 

 module.exports=router;