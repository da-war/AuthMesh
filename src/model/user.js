import * as Joi from 'joi';

import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max:255,
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 255,
    }
});


const User=mongoose.model('User',userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().email().min(5).max(255),
        password: Joi.string().required().min(5).max(255),
    }); 
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
