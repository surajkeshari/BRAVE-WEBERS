const express = require('express');
const router= express.Router();
const Users = require(`../models/user`);
const Items = require(`../models/catalogItems`);
const restUsers = require(`../models/restaurant`);
//Get login/signup routes
router.get(`/restSignup`, (req, res) => {
    res.render(`signup(r)`);
})

router.get(`/restLogin`, (req, res) => {
    res.render(`login(r)`);
})
// Get page of restaurant
router.get(`/restUser/:id`,(req,res)=>{
    restUsers.findById(req.params.id,(err,user)=>{
        if(err){
            console.log(err);
        }else{
            Items.find({rest_id:user._id},(err,items)=>{

                res.render('restPage',{restUser:user, items:items,isUser:false});
            })
           
        }
     })
    })

    //Get menu of restaurant
    router.get(`/user/:userid/:restid/:restname/menu`,(req,res)=>{
        const query= restUsers.findById(req.params.restid).exec();
        query.then((user)=>{
            Items.find({rest_id:user._id}).then((items)=>{
                res.render('restPage',{restUser:user, items:items,isUser:true});  
            })
        })
    })


     //Adding items
//Get page to add items
router.get(`/restUser/:id/add`,(req,res)=>{

    res.render(`add`,{id:req.params.id,Head:"Add Item", purpose:'addItem'});
})

router.post('/restUser/:id/addItem',(req,res)=>{
    let newitem = new Items({
        name:req.body.name,
        price:req.body.price,
        prepTime: req.body.prepTime,
        rest_id: req.params.id
    })
   
    newitem.save((err)=>{
       if(err){
       console.log(err);
       }else{
           // res.redirect(`/demo`);
           console.log("Done");
           
           
       //     restUsers.findById(req.params.id,(err,user)=>{
       //         if(err){ console.log(err)};
       //         user.items.push(newitem);
       //         user.save();
       //         console.log("Saved");
       //         res.redirect(`/restUser/${user._id}/${user.name}`)
       //   })
       restUsers.findById(req.params.id,(err,user)=>{
           res.redirect(`/restUser/${user._id}`)
       })
       }
   })
   
   
   
   })
   
   
   // deleting Items
   router.post('/restUser/:id/:itemId/delete',(req,res)=>{
       Items.deleteOne({_id:req.params.itemId}).then(()=>{
           console.log("Data Deleted");
           res.redirect(`/restUser/${req.params.id}`)
       }).catch((err)=>{
           console.log(err);
           
       })
   })
   
   // Editing Items
   router.get(`/restUser/:id/:itemId/edit`,(req,res)=>{
       restUsers.findById(req.params.id,(err,user)=>{
           if(err){
               console.log(err);
           }
           Items.findById(req.params.itemId,(err,item)=>{
               if(err){
                   console.log(err);
               }
               res.render(`edit`,{restUser:user,item : item});
           })
       })
   })
   
   router.post(`/restUser/:id/:itemId/edit`,(req,res)=>{
       let item={
           name:req.body.name,
           price:req.body.price,
           prepTime:req.body.prepTime
       }
       Items.updateOne({_id:req.params.itemId},item,(err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect(`/restUser/${req.params.id}`)
        }
       })
   })
   
   module.exports= router;