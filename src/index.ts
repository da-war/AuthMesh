import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

// Initialize Express app
const app = express();

// Define a port to listen on
const port = 3000;

// Define a basic route for the root ("/")
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/authmesh')
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
