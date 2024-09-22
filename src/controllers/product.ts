import express, { Request, Response } from 'express';
import { Product } from '../../src/model/product';

const router = express.Router();


//get all products
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

//get single product
export const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Product not found.');
        res.send(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


//create product

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.send(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

//update product

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).send('Product not found.');
        res.send(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


//delete product
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send('Product not found.');
        res.send(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

export default router;
