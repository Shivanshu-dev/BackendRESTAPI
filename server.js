const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const restaurants = require('./routes/restaurants');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config({path:'./config/config.env'})

// database connection from here
connectDB();

const app = express();

// parse to json
app.use(express.json());

// routes mounted
app.use('/api/dev/v1/restaurants' , restaurants);

// custom error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000
const server = app.listen(PORT , console.log(`SERVER running on PORT ${process.env.PORT} and env ${process.env.NODE_ENV} `))


process.on('unhandledRejection' , (reason, promise)=>{
    console.log(`error message is ${reason}`)
    server.close(()=> process.exit(1));
})