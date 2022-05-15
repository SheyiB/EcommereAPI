//Import files and dependencies
const express = require('express');
const User = require('./routes/User');
const Cart = require('./routes/Cart')
const Item = require('./routes/Item');
const Order = require('./routes/Order');
const connectDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const Auth = require('./routes/Auth');



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
app.use('/api/v1/items',Item);
app.use('/api/v1/cart',Cart);
app.use('/api/v1/order',Order);
app.use('/api/v1/auth', Auth);


const PORT = process.env.PORT || 9230;

//Listen to requests
const server = app.listen(
    PORT,
    console.log(`Server is running on PORT: ${PORT} mongouri is ${process.env.MONGO_URI}`)
);

app.use('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));