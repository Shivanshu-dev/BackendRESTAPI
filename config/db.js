const mongoose = require('mongoose');

const connectDB = async()=>{
    mongoose.set("strictQuery", false);
 const connectionRequest = await mongoose.connect(process.env.MONGO_URI);

 console.log("MongoDb has been connected")
}

module.exports = connectDB