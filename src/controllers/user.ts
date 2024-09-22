import { Request, Response } from 'express';
import { IUser, User, validateUser } from '../model/user'; // Adjust the path as necessary

import jwt from 'jsonwebtoken';


const JWT_ACCESS_SECRET = process.env.JWT_SECRET || 'somethingisfishygeneralsahab';
const JWT_REFRESH_SECRET = process.env.JWT_SECRET || 'somethingisfishygeneralsahab';





const generateAccessToken = (user: IUser) => {
    return jwt.sign({ id: user._id }, JWT_ACCESS_SECRET, { expiresIn: "1h" });
};

const generateRefreshToken = (user: IUser) => {
    return jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: await User.prototype.generateHash(req.body.password), // Use prototype method
        });

        await user.save();

        //gernerate access and refresh token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        const userId= user._id;
        const name=user.name;
        const email=user.email;

        res.send({ accessToken, refreshToken, userId, name, email });

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-password'); // Exclude password
        res.send(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

// Get a single user
export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).send('User not found.');
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email});
        if (!user) return res.status(400).send('Invalid email or password.');

        const validPassword = await user.validatePassword(req.body.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');
        //exclude password from response

        
        

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        const userId= user._id;
        const name=user.name;
        const email=user.email;

        res.send({ accessToken, refreshToken, userId, name, email });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

// Export functions as needed
