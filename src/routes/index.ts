import express from "express";
import products from "./api/products";

const router = express.Router();

router.use("/api", products);

export default router;
