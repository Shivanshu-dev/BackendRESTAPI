const Restaurant = require('../models/Restaurants');

exports.getAllRestaurants = async(req,res,next)=>{
    try {

        // for pagination
        const reqQuery = {...req.query};


// this will remove these two feilds from the data document
        const removeFeilds = ['page' , 'limit']

        removeFeilds.forEach((param)=> delete reqQuery[param]);

console.log(req.query.page)

const page = parseInt(req.query.page , 10) || 1;
const limit = parseInt(req.query.limit , 10) || 2;
const startIndex = (page - 1) * limit;
const endIndex = page * limit;
const total = await Restaurant.countDocuments();

        let queryStr = JSON.stringify(reqQuery);

        // queryStr = queryStr.replace(/\b(gt | gte | lt |lte | in)\b/g , match => `$${match}`);

        const restaurants = await Restaurant.find(JSON.parse(queryStr)).skip(startIndex).limit(limit);

// pagination result with final result
const pagination = {};

if(endIndex < total){
    pagination.next = {
        page:page + 1,
        limit
    }
}
if(startIndex > 0){
    pagination.prev = {
        page:page - 1,
        limit
    }
}

        res.status(200).json({success:true ,count:restaurants.length,pagination , data:restaurants})
    } catch (error) {
        res.status(500).json({success:false , message:error.message})
    }
}

//private
exports.createRestaurant = async(req,res,next)=>{
    try {
        const restaurant = await Restaurant.create(req.body);
        res.status(201).json({success:true , body:restaurant    })
    } catch (error) {
        res.status(500).json({success:false , message:error.message})
    }

}

exports.getRestaurant = async(req,res,next)=>{
    try {
        const restaurant = await Restaurant.findById(req.params.id)

        if(!restaurant){
      return   res.status(400).json({success:false , message:'No restaurant found'})
        }
 res.status(200).json({success:true , data:restaurant})

    } catch (error) {
        next(error);
    //   res.status(500).json({success:false , message:error.message})
        
    }
}

//private
exports.updateRestaurant = async (req,res,next)=>{
 try {
    // new true returns the latest object
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id , req.body , {new:true, runValidators:true});
    if(!restaurant){
return   res.status(400).json({success:false , message: "Could not update data"})
    }
     res.status(200).json({success:true , data:restaurant})
 } catch (error) {
  res.status(500).json({success:false , message:error.message})  
 }

  
}

// private
exports.deleteRestaurant = async(req,res,next)=>{
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if(!restaurant){
         res.status(400).json({success:false , message: "Could not delete data"})
        }
         res.status(200).json({success:true , data:restaurant})
     } catch (error) {
      res.status(500).json({success:false , message:error.message})  
     }
}