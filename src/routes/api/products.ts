import express from "express";
import ProductController from "../../controllers/ProductController";

const products = express.Router();

products.get("/products", ProductController.getProducts);
products.get("/products/:id", ProductController.getProduct);
products.post("/products/create", ProductController.create);
products.put("/products/update", ProductController.edit);
products.delete("/products/delete/:id", ProductController.delete);

export default products;
