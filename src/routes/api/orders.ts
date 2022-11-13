import express from "express";
import OrderController from "../../controllers/OrderController";
import verifyRequest from "../../middleware/verifyRequest";

const orders = express.Router();

orders.get("", OrderController.index);
orders.get("/:id", OrderController.show);
orders.post("", verifyRequest, OrderController.create);
orders.put("/:id", verifyRequest, OrderController.update);
orders.delete("/:id", verifyRequest, OrderController.delete);
orders.get(
  "/currentOrder/:user_id",
  verifyRequest,
  OrderController.getCurrentOrder
);
orders.post("/:id/products", verifyRequest, OrderController.addProduct);
orders.delete(
  "/:order_id/products/:product_id",
  verifyRequest,
  OrderController.removeProduct
);

export default orders;
