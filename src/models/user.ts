import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import Joi from 'joi';

// Define an interface for the User document
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    generateHash(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
    _id:string;
    isAdmin: boolean;
}

// Create the User schema
const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    isAdmin: {
        type: Boolean,
        default: false, // Default user is not an admin
    },
},
{
    timestamps: true,
}
);

// Method to hash password
userSchema.methods.generateHash = async function(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Method to validate password
userSchema.methods.validatePassword = async function(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

// Validation schema for user 
const validateUser = (user: any) => {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().email().min(5).max(255),
        password: Joi.string().required().min(5).max(255),
    });

    return schema.validate(user);
};

// Create and export the User model and validateUser function
const User = mongoose.model<IUser>('User', userSchema);
export { User, validateUser };
