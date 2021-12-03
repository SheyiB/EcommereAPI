const User = require('../models/user')

//@desc Login User
//@route GET /api/v1/user/:id
//@access Public

module.exports.signup = async (req,res ) =>{

    try {
        const {name, email, address, dob, userType, password} = req.body

        const user = await User.create({
            name, email, address, dob, userType, password
        });

        res.status(201).json({
            success: true,
            message: `Signup Successful `,
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
        const passwordMatch = await user.passwordMatch(password);

        if(!passwordMatch){
            res.json(`Invalid credentials`);
        }

        const token = user.getSignedJwtToken();

        const options = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.status(200).cookie('token', token, options).json({success:true, token, message: `Login Successful`});

    } catch (error) {
        res.status(500).json({success: false, data: 'An error has occured', message: error.message})
    }

}