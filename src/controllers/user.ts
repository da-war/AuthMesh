import { Request, Response } from 'express';
import { User, validateUser } from '../model/user'; // Adjust the path as necessary

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
        res.send(user);
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
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password.');

        const validPassword = await user.validatePassword(req.body.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        res.send(user); // Optionally, exclude password
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

// Export functions as needed
