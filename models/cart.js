const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    userId:{
        type: String,
        ref: "user"
    },
    items : [
        {
            productId: {
                type: String,
                ref: 'item'
            },
            name: {
                type: String,
                required: true
            },
            quantity:{
                type: Number,
                min: 1,
                required: true,
                default: 1
            },
            price: Number
        }
    ],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('cart', CartSchema)

