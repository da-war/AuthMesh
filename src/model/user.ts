import Joi from 'joi';
import mongoose from 'mongoose';

interface User {
    name:string,
    email:string,
    password:string
}

// Constants for validation rules
const NAME_MIN_LENGTH = 5;
const NAME_MAX_LENGTH = 50;
const EMAIL_MIN_LENGTH = 5;
const EMAIL_MAX_LENGTH = 255;
const PASSWORD_MIN_LENGTH = 5;
const PASSWORD_MAX_LENGTH = 255;

// Define User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: NAME_MIN_LENGTH,
        maxlength: NAME_MAX_LENGTH,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: EMAIL_MIN_LENGTH,
        maxlength: EMAIL_MAX_LENGTH,
    },
    password: {
        type: String,
        required: true,
        minlength: PASSWORD_MIN_LENGTH,
        maxlength: PASSWORD_MAX_LENGTH,
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Create User model
const User = mongoose.model('User', userSchema);

// Validation function using Joi
const validateUser = (user:User) => {
    const schema = Joi.object({
        name: Joi.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH).required(),
        email: Joi.string().email().min(EMAIL_MIN_LENGTH).max(EMAIL_MAX_LENGTH).required(),
        password: Joi.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH).required(),
    });

    return schema.validate(user);
};

// Exporting model and validation function
export { User, validateUser };
