const mongoose= require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);
const Items= require(`./catalogItems`)
let restSchema = new mongoose.Schema(
    { 
        name:String,
        email:String,
        contact_no: Number,
        password:String,
        address:String,
        items:[{type: mongoose.Schema.Types.ObjectId, ref: 'Items'}]

    }
);
restSchema.plugin(passportLocalMongoose,{usernameField : 'email'});

let restUsers= new mongoose.model('restUser',restSchema);
module.exports= restUsers;