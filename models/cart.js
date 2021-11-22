const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items : [{
        productId: {
                type: String,
               required: true
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

CartSchema.methods.getTotalBill = () => {
    this.bill = this.items.quantity * this.items.price
}
module.exports = mongoose.model('cart', CartSchema)

