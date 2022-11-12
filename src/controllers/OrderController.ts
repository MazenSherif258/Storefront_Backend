import { Request, Response } from "express";
import OrderModel, { Order } from "../models/OrderModel";

export default class OrderController {
  static async index(_req: Request, res: Response): Promise<void> {
    try {
      const result = await OrderModel.getOrders();
      if (result.length) {
        res.status(200).json({
          status: 200,
          response: {
            msg: "Retrieved Successfully!",
            data: result,
          },
        });
      } else {
        res.status(200).json({
          status: 200,
          response: {
            msg: "No Orders Found!",
            data: result,
          },
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        response: {
          msg: (err as Error).message,
        },
      });
    }
  }

  static async show(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await OrderModel.getOrder(id);
      if (result) {
        res.status(200).json({
          status: 200,
          response: {
            msg: "Retrieved Successfully!",
            data: result,
          },
        });
      } else {
        res.status(200).json({
          status: 200,
          response: {
            msg: "Order Was Not Found!",
            data: result,
          },
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        response: {
          msg: (err as Error).message,
        },
      });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { user_id, status } = req.body;
      const order: Order = {
        user_id: user_id,
        status: status,
      };
      const result = await OrderModel.create(order);
      res.status(200).json({
        status: 200,
        response: {
          msg: "Created Successfully!",
          data: result,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        response: {
          msg: (err as Error).message,
        },
      });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { user_id, status } = req.body;
      const order: Order = {
        user_id: user_id,
        status: status,
      };
      const result = await OrderModel.update(id, order);
      if (result) {
        res.status(200).json({
          status: 200,
          response: {
            msg: "Updated Successfully!",
            data: result,
          },
        });
      } else {
        res.status(200).json({
          status: 200,
          response: {
            msg: "Order Was Not Found!",
            data: result,
          },
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        response: {
          msg: (err as Error).message,
        },
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await OrderModel.delete(id);
      if (result) {
        res.status(200).json({
          status: 200,
          response: {
            msg: "Deleted Successfully!",
            data: result,
          },
        });
      } else {
        res.status(200).json({
          status: 200,
          response: {
            msg: "Order Was Not Found!",
            data: result,
          },
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        response: {
          msg: (err as Error).message,
        },
      });
    }
  }

  static async getCurrentOrder(req: Request, res: Response): Promise<void> {
    try {
      const user_id = parseInt(req.params.user_id);
      const result = await OrderModel.getCurrentOrder(user_id);
      if (result) {
        res.status(200).json({
          status: 200,
          response: {
            msg: "Retrieved Successfully!",
            data: result,
          },
        });
      } else {
        res.status(200).json({
          status: 200,
          response: {
            msg: "Order Was Not Found!",
            data: result,
          },
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        response: {
          msg: (err as Error).message,
        },
      });
    }
  }

  static async addProduct(req: Request, res: Response): Promise<void> {
    try {
      const order_id = parseInt(req.params.id);
      const { quantity, product_id } = req.body;
      const result = await OrderModel.addProduct(
        order_id,
        quantity,
        product_id
      );
      res.status(200).json({
        status: 200,
        response: {
          msg: "Created Successfully!",
          data: result,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        response: {
          msg: (err as Error).message,
        },
      });
    }
  }

  static async removeProduct(req: Request, res: Response): Promise<void> {
    try {
      const order_id = parseInt(req.params.order_id);
      const product_id = parseInt(req.params.product_id);
      const result = await OrderModel.removeProduct(order_id, product_id);
      if (result) {
        res.status(200).json({
          status: 200,
          response: {
            msg: "Deleted Successfully!",
            data: result,
          },
        });
      } else {
        res.status(200).json({
          status: 200,
          response: {
            msg: "Order Product Was not Found!",
            data: result,
          },
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        response: {
          msg: (err as Error).message,
        },
      });
    }
  }
}
