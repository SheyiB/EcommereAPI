const mongoose = require('mongoose');
const {isEmail} = require('validator');
const passwordValidator = require('password-validator');

const schema = new passwordValidator();

const checkPassword =  (password) =>{
    schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces();

    return schema.validate(password)
}


const userSchema = new mongoose.Schema({
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
    register_date:{
        type: Date,
        default: Date.now
    }
})

module.exports = userModel = mongoose.model('user', userSchema)