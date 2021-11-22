const User = require('../models/user')
//@desc Login User
//@route GET /api/v1/user/:id
//@access Public

module.exports.createUser = async (req,res ) =>{

    try {
        const {name, email, address, dob, userType, password} = req.body

        const user = await User.create({
            name, email, address, dob, userType, password
        });

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

module.exports.login = async(req,res) =>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            res.json(`Please provide a valid email and password`)
        }
        const user = await User.findOne({email}).select('+password');

        if(!user){
            res.json(`Invalid credentials`)
        }

        // Check if password matches
        const passwordMatch = await user.matchPassword(password);

        if(!passwordMatch){
            res.json(`Invalid credentials`)
        }

    } catch (error) {

    }

}