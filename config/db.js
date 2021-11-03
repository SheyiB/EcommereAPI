const mongoose = require('mongoose');

const connectDB = async () => {
    const connekt = await mongoose.connect(process.env.MONGO_URI,{

    });

    console.log(`MongoDB Connected: ${connekt.connection.host}`);
}

module.exports = connectDB;