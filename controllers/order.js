const Order = require('../models/order')

//@desc : Create an order
//@route POST /api/v1/order
//@access Private
module.exports.createOrder = async(req, res) => {
    const { name, price, quantity} = req.body.item;

}