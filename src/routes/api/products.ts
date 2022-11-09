import express from 'express';
import ProductController from '../../controllers/ProductController';

const products = express.Router();

products.get('/products', ProductController.getProducts);
products.get('/products/:id', ProductController.getProduct)


export default products;
