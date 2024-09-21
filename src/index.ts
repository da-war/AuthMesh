import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user'; // Ensure this path is correct

const app = express();
const port = 3000;

app.use(express.json()); // Middleware for parsing JSON requests

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.use('/users', userRouter); // Use the user router

mongoose.connect('mongodb://localhost:27017/authmesh')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
