import express from "express";
import ProductController from "../../controllers/ProductController";

const products = express.Router();

products.get("/products", ProductController.getProducts);
products.get("/products/:id", ProductController.getProduct);
products.post("/products", ProductController.create);
products.put("/products/:id", ProductController.edit);
products.delete("/products/:id", ProductController.delete);

export default products;
