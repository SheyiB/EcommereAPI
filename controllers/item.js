const Item = require('../models/item');

//@desc Create Item
//@route POST /api/v1/Item/:id
//@access Public
module.exports.createItem = async (req,res,next ) =>{

    try {
        const item = await Item.create(req.body);

        res.status(201).json({
            success: true,
            message: `Creating Item `,
            data: item
        });

    } catch (err) {
         res.status(400).json({
            success: false,
            message: err.message,

        });
    }
    console.log(req.body)
}

//@desc Get all Items
//@route GET /api/v1/Item
//@access Private
module.exports.getItems = async(req,res,next) =>{
    try {
        const items = await Item.find()

        res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

//@desc Get one Item
//@route GET /api/v1/Item/:id
//@access Private
module.exports.getItem = async(req,res,next ) =>{
    try{
    const item = await Item.findById(req.params.id)
    if(!item){
        res.status(404).json({
            message: `Item with ID: ${req.params.id} not found`
        })
    }
    res.status(200).json({
        success: true,
        data: item
    });
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message,
        })
}}

//@desc Update Item
//@route PUT /api/v1/Item/:id
//@access Private
module.exports.updateItem = async (req,res,next ) =>{
    try{
        let item = await Item.findById(req.params.id)
        if(!item){
            res.status(404).json({
                message: `Item with ID: ${req.params.id} not found`
            })
        }
        item = await Item.findOneAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            success: true,
            data: item
        });
    }

    catch(error){
        res.status(400).json({
            success: false,
            message: error.message,
    })
}
}

//@desc Delete Item
//@route DELETE /api/v1/Item/:id
//@access Private
module.exports.deleteItem = async(req,res,next ) =>{
try {
    const item = await Item.findById(req.params.id)

    if(!item){
        res.status(404).json({
            message: `Item with ID: ${req.params.id} not found`
        })
    }
    item.remove()

    res.status(200).json({
        success: true,
        data: {}
    });
} catch (err) {
    res.status(401).json({
        sucess: false,
        message: err.message
    })
}
}


