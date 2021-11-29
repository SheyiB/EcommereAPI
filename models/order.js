const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    userId:{
        type: String,
        ref: 'User'

    },
    item:[{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        productId:{
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    bill:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        default: 'Pending'
    },
    date_added: {
        type: Date,
        default: Date.now,
        required: true
    }

})

module.exports = mongoose.model('order', OrderSchema)