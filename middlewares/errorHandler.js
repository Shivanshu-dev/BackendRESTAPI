const errorHandler = (err , req , res, next)=>{
console.log(err)
res.status(400).json({success:false , message:err.message});
}


module.exports = errorHandler;