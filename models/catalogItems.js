const mongoose =require('mongoose');
let itemSchema = new mongoose.Schema(
    {
        name:String,
        price:Number,
        prepTime:Number
    }
)
let Items= mongoose.model('Items',itemSchema);
module.exports= Items;