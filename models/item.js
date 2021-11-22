const mongoose = require('mongoose');

const ItemModel = mongoose.Schema({
    name : {
        type: String,
        unique: true,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    QuantityInStock :{
        type: Number,
        required: true
    },
    dateAdded:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Item', ItemModel)

