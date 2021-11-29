const Order = require('../models/order');
const Cart = require('../models/cart');
const User = require('../models/user');
const axios = require('axios').default;

//@desc : Get user's order
//@route GET /api/v1/order/:id
//@access Private
module.exports.getOrder = async(req, res) => {
    try{

    const order = await Order.find({userId: req.params.id}).sort({date_added: -1}).populate({path: 'userId', select: 'name email'});

    if(!order){
        res.status(404).json({
            success: false,
            message: 'Order not found'
        })
    }



    res.status(200).json({
        success: true,
        data: order
    })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}

module.exports.getAllOrders = async(req, res) => {

    try{
        const order = await Order.find().sort({date_added: -1}).populate({path: 'userId', select: 'name email'});

    if(!order){
        res.status(404).json({
            success: false,
            message: 'Order not found'
        })
    }

    res.status(200).json({
        success: true,
        data: order
    })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }


}
//@desc: Checkout User's Cart
//@route POST /api/v1/checkout/:id
module.exports.checkout = async(req,res) => {

    try {
    const userId = req.params.id;
    const userCart = await Cart.findOne({userId});
    const paymentOption = req.body.paymentOption;

    const user = await User.findById(userId);

    if(userCart == null){
        res.status(400).json({
            success: false,
            message: 'Cart is empty, add an item to cart'
        })
    }

    let userOrder = await Order.create({
        userId,
        item: userCart.items,
        bill: userCart.bill
    })

    userCart.remove()

    res.status(201).json({
        success: true,
        data: userOrder
    })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }






    // if(userCart){
    //     const payment = {
    //     "tx_ref": `${name}${Date.now}${userId}`,
    //     "amount": bill,
    //     "currency":"NGN",
    //     "redirect_url":"https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
    //     "payment_options": paymentOption,
    //     "meta":{
    //        "consumer_id":23,
    //        "consumer_mac":"92a3-912ba-1192a"
    //     },
    //     "customer":{
    //        "email" : user.email,
    //        "phonenumber": user.phone,
    //        "name": user.name
    //     },
    //     "customizations":{
    //        "title":"Shopping Cart Payment",
    //        "description":"Middleout isn't free. Pay the price",
    //        "logo":"https://assets.piedpiper.com/logo.png"

    //     }
    // }

    //axios.post('/user', payment).then(result => console.log(result) ).catch(err=> err.message);

    /**const flutreq = axios.create({
        baseURL: 'https://api.flutterwave.com/v3/payments',
        headers:  {'Authorization': 'Bearer {FLWSECK_TEST-e6b808b2cc8ffacee115fcb261772bfa-X}'},
        method: 'post',
        data : payment

    })**/
     }
