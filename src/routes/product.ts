import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts } from "src/controllers/product";

const router = Router();


router.post('/create-product', createProduct);

router.get('/get-product/:id', getProduct);

// Other CRUD routes can be added here  
router.get('/', getProducts);
//delete
router.delete('/delete-product/:id', deleteProduct);




export default router

