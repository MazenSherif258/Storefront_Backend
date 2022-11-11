import express from "express";
import admins from "./api/admins";
import orders from "./api/orders";
import products from "./api/products";
import users from "./api/users";

const router = express.Router();

router.use("/products", products);
router.use("/users", users);
router.use("/admins", admins);
router.use("/orders", orders);

export default router;
