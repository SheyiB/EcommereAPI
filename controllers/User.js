const User = require('../models/user');

//@desc Create User
//@route POST /api/v1/user/:id
//@access Public
module.exports.createUser = async (req,res,next ) =>{
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            message: `Creating User `,
            data: user
        });

    } catch (err) {
         res.status(400).json({
            success: false,
            message: err.message,

        });
    }
    console.log(req.body)
}

//@desc Get all Users
//@route GET /api/v1/user
//@access Private
module.exports.getUsers = async(req,res,next) =>{
    try {
        const user = await User.find()

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,

        });
    }

}

//@desc Get one User
//@route GET /api/v1/user/:id
//@access Private:
module.exports.getUser = async(req,res,next ) =>{
    try{

    const user = await User.findById(req.params.id)

    if(!user){
        res.status(404).json({
            message: `User with ID: ${req.params.id} not found`
        })
    }

    res.status(200).json({
        success: true,
        data: user
    });

    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message,

        })
}}

//@desc Update User
//@route PUT /api/v1/user/:id
//@access Private: Admin
module.exports.updateUser = async (req,res,next ) =>{

    try{
        let user = await User.findById(req.params.id)

        if(!user){
            res.status(404).json({
                message: `User with ID: ${req.params.id} not found`
            })
        }

        user = await User.findOneAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            data: user
        });
    }

    catch(error){
        res.status(400).json({
            success: false,
            message: error.message,
    })


}
}
//@desc Delete User
//@route DELETE /api/v1/user/:id
//@access Private: Admin
module.exports.deleteUser = async(req,res,next ) =>{
try {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(404).json({
            message: `User with ID: ${req.params.id} not found`
        })
    }

    user.remove()

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
//@desc Login User
//@route DELETE /api/v1/user/:id
//@access Private
