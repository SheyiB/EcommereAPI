const { create } = require('../models/cart');
const Cart = require('../models/cart')
const Item = require('../models/item')

//@desc : Add Item to cart
//@Route : POST api/v1/cart
//Private
module.exports.addItemToCart = async(req,res) => {
    const userId = req.params.id;

    const {itemId, quantity} = req.body
    try {
        let cart = await Cart.findOne({userId})

        let item = await Item.findOne({_id: itemId})

        if(!item){
            res.status(404).json(`Item not found`)
        }

        const price = item.price;
        const name = item.name;
        const productId = itemId;


        if(cart) {
            //Check if Item exists by checking for the items' index

            let itemIndex = cart.items.findIndex(p => p.productId == itemId);


            //If it exists then update the quantity and the item on the cart
            if(itemIndex > -1)
            {
                let product = cart.items[itemIndex];
                product.quantity += quantity;
                cart.items[itemIndex] = product;
            }
            else{
                cart.items.push({ productId, name, quantity, price});
            }
            cart.bill += quantity*price;
            cart = await cart.save();
            return res.status(201).json({
                success: true,
                data: 'Item added Successfully',
                cart
            })
        }
        else{
        const userCart = await Cart.create({
            userId,
            items: [{productId, name, quantity, price}],
            bill: quantity*price
            })

        return (res.status(200).json({
            success: true,
            data: 'Item added Successfully',
            cart : userCart
        }))
        }




    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            data: error.message
        })
    }

}

//@desc : Get Item on the cart
//@Route : GET api/v1/cart
//Private
module.exports.getCart = async(req,res) => {
const userId = req.params.id;

try{
    const cart = await Cart.findOne({userId: userId}).populate({path: 'userId', select: 'name email'});

    if(cart == null){
        res.status(200).json({
            success: true,
            data: `No item on Cart`
        })
    }
    res.status(200).json(cart)
}catch(err){
    res.status(500).json({
        success: false,
        message: err.message
    })
}



}

//@desc : Update Item on the cart
//@Route : PUT api/v1/cart
//Private
module.exports.updateCart = async(req,res) =>{
    const userId = req.params.id;
    const {itemId,quantity} = req.body;

    try {
        const item = await Item.findById(itemId);
        let cart = await Cart.findOne({userId: userId});
        if(!item){
            res.status(404).json(`Item with id ${itemId} not found`);
        }

        const name = item.name;
        const price = item.price;


        if(!cart){
            res.status(404).json(`Cart does not exist for user ${itemId} Add item to cart instead`);
        }
        if(cart) {
            //Check for item index on the cart
            let itemIndex = cart.items.findIndex(p=> p.productId == itemId);
            if(itemIndex == -1){
                res.status(404).json({
                    success: false,
                    message: `Item not found on the cart`
                })
            }
            //If it exists then update the quantity of the item on the cart
            if(itemIndex > -1)
            {
                let product = cart.items[itemIndex];
                product.quantity =  quantity;
                cart.items[itemIndex] = product;
            }
            else{
                cart.items.push({ itemId, name, quantity, price});
            }
            cart.bill = cart.items.reduce((total, item) => total + item.price * item.quantity,0)
            cart = await cart.save();
            return res.status(201).json({
                success: true,
                data: 'Item updated Successfully',
                cart
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }



}

//@desc : Update Item on the cart
//@Route : PUT api/v1/cart
//Private
module.exports.deleteItemFromCart = async(req,res) =>{
    const userId = req.params.id;
    const {itemId} = req.body;

    try {
        const item = await Item.findById(itemId);
        let cart = await Cart.findOne({userId: userId});
        if(!item){
            res.status(404).json(`Item with id ${itemId} not found`);
        }

        const name = item.name;


        if(!cart){
            res.status(404).json(`Cart does not exist for user ${itemId} use addItemToCart Route instead`);
        }
        if(cart) {

            //If it exists then update the quantity and the item on the cart
            if(cart.items[0].name == name)
            {

            }


        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }



}

