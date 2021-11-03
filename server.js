//Import files and dependencies
const express = require('express');
const User = require('./routes/User');
const connectDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');



//Load environment Variables
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB();

const app = express();

//middle ware that logs the route being accessed with other details like status code
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
//Body Parser
app.use(express.json());


//Mount Routers
app.use('/api/v1/users',User);


const PORT = process.env.PORT || 9230;

//Listen to requests
const server = app.listen(
    PORT, 
    console.log(`Server is running on PORT: ${PORT} mongouri is ${process.env.MONGO_URI}`)
);