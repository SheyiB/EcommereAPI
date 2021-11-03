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
module.exports.getUsers = (req,res,next) =>{
   res.status(200).json({
       success: true,
       data: "Getting Users"
   });
}

//@desc Get one User
//@route GET /api/v1/user/:id
//@access Private
module.exports.getUser =(req,res,next ) =>{
    res.status(200).json({
        success: true,
        data: `Getting User with id: ${req.params.id}`
    });
}

//@desc Update User
//@route PUT /api/v1/user/:id
//@access Private
module.exports.updateUser =(req,res,next ) =>{
    res.status(200).json({
        success: true,
        data: `Updating User with id: ${req.params.id} `,
        newChange: req.body
    });
}

//@desc Delete User
//@route DELETE /api/v1/user/:id
//@access Private
module.exports.deleteUser =(req,res,next ) =>{
    res.status(200).json({
        success: true,
        data: `Deleting User with id: ${req.params.id}`
    });
}


