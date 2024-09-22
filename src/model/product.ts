//make a product model having id, name, description, price
import mongoose, { Document, Schema } from 'mongoose';


export interface Product extends Document{
    name: string;
    description: string;
    price: number;
    id: string;
}

const productSchema: Schema<Product> = new Schema(
    {
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    price: {
        type: Number,
        required: true,
    }
},
{
    timestamps: true,
},
);


const Product = mongoose.model<Product>('Product', productSchema);

export { Product }

