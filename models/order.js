const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    user:{
        type: String,
        ref: user
    },
    item:{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        id:{
            type: String,
            ref: item
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: 1
        }
    }
})

module.exports = mongoose.model('order', OrderSchema)