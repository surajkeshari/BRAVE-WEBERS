const mongoose= require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);
let userSchema = new mongoose.Schema(
    { 
        name:String,
        email:String,
        contact_no: Number,
        password:String

    }
);
userSchema.plugin(passportLocalMongoose,{usernameField : 'email'});

let Users= new mongoose.model('user',userSchema);
module.exports= Users;