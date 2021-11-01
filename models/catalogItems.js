const mongoose =require('mongoose');
let itemSchema = new mongoose.Schema(
    {
        name:String,
        price:Number,
        prepTime:Number,
        rest_id:mongoose.Schema.Types.ObjectId
    }
)
let Items= mongoose.model('Items',itemSchema);
module.exports= Items;