const mongoose= require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);
let restSchema = new mongoose.Schema(
    { 
        name:String,
        email:String,
        contact_no: Number,
        password:String,
        address:String,

    }
);
restSchema.plugin(passportLocalMongoose,{usernameField : 'email'});

let restUsers= new mongoose.model('restUser',restSchema);
module.exports= restUsers;