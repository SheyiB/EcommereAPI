const mongoose = require('mongoose');
const {isEmail} = require('validator');
const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const schema = new passwordValidator();
const jwt = require('jsonwebtoken');

const checkPassword =  (password) =>{
    schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces();

    return schema.validate(password)
}


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        },
    address: {
        type: String,
        },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    dob: {
        type:Date
    },
    phone: {
        type: Number,
        required: true
    },
    userType:{
        type: String,
        enum: ['Customer'],
        default: 'Customer'
    },
    password:{
        type: String,
        required: true,
        validate: {
            validator: function(v){
                return checkPassword(v)
            },
            message : 'Password must consist of Uppercase, LowerCase and a Number'
        }
    },
    orders: String,
    register_date:{
        type: Date,
        default: Date.now
    }


});

//Encrypt password before saving it to db using bcrypt
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Create JWT and Return
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}

//Check if password matches
UserSchema.methods.passwordMatch = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = userModel = mongoose.model('User', UserSchema)