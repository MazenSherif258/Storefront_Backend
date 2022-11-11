import express from "express";
import ProductController from "../../controllers/ProductController";
import verifyRequest from "../../middleware/verifyRequest";

const products = express.Router();

products.get("", ProductController.index);
products.get("/:id", ProductController.show);
products.post("", verifyRequest, ProductController.create);
products.put("/:id", verifyRequest, ProductController.update);
products.delete("/:id", verifyRequest, ProductController.delete);

export default products;
