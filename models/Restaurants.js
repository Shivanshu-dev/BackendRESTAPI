const mongoose = require('mongoose');
const slugify = require('slugify');




const RestaurantsSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true , 'Please enter a name for the Restaurant'],
        trim: true,
        maxLength: [30 , 'Name cannot be more than 30 characters']
    },
    city: {
        type: String,
        required: [true , 'Please enter the city of restaurant'],
        trim: true,
        maxLength: [10 , 'City name cannot be longer than 15 characters']
    },
    slug: String,
    description: {
        type:String,
        required:true,
        trim:true,
        maxLength: [100 , "Description cannot be more than 100 characters"]
    },
    address : {
        type:String,
        required:true,
        maxLength: [30, 'Address cannot be longer than 30 characters']
    },
    pincode: {
        type: Number,
        required:true,
    },
    email: {
        type:String,
        match: [ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , "Please enter a valid email"]
    },
    category : {
        type: [String],
        required: true,
        enum: ['Veg' , 'Non-Veg' , 'Both Veg and Non veg']
    },
    rating: {
        type:Number,
        min: [1 , 'Rating must be atleast 1'],
        max: [5 , 'Rating can be maximum 5']
    },
    displayImage: {
        type:String,
        default: 'no-photo.jpg'
    },
    createdAt : {
        type:Date,
        default:Date.now
    }
})

// create slug from name 
RestaurantsSchema.pre('save' , function(next){
    this.slug = slugify(this.name, {lower:true});
    next();
})



module.exports = mongoose.model('Restaurant' , RestaurantsSchema);