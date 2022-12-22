const mongoose = require('mongoose');


const DishesSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        maxLength: [10 , "Dishe name cant be longer than 10 characters"],
        trim:true
    },
    photo : {
        type:String,
        default:'no-photo.jpg',
        trim:true
    },
    price: {
        type:Number,
        required: [true , 'Please add a price']
    },
    description: {
        type:String,
        required:[true , 'Please add a description']
    },
    createdAt : {
        type:Date,
        default:Date.now
    },
    Restaurant : {
        type : mongoose.Schema.ObjectId,
        ref: 'Restaurant',
        required:true
    }
})

module.exports = mongoose.model('Dish' , DishesSchema);