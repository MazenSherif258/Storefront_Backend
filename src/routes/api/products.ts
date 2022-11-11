import express from "express";
import ProductController from "../../controllers/ProductController";
import verifyRequest from "../../middleware/verifyRequest";

const products = express.Router();

products.get("", ProductController.index);
products.get("/:id", ProductController.show);
products.post("", verifyRequest, ProductController.create);

export default products;
