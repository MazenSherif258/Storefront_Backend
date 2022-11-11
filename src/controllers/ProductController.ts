import { Request, Response } from "express";
import ProductModel, { Product } from "../models/ProductModel";

export default class ProductController {
  static async index(_req: Request, res: Response): Promise<void> {
    try {
      const result = await ProductModel.getProducts();
      if (result[0]) {
        res.status(200).json({
          status: 200,
          response: {
            msg: "Retrieved Successfully!",
            data: result,
          },
        });
      } else {
        res.status(404).json({
          status: 404,
          response: {
            msg: "No Products Were Found!",
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
      const result = await ProductModel.getProduct(id);
      if (result) {
        res.status(200).json({
          status: 200,
          response: {
            msg: "Retrieved Successfully!",
            data: result,
          },
        });
      } else {
        res.status(404).json({
          status: 404,
          response: {
            msg: "Product Not Found!",
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
      const { name, price, category } = req.body;
      const product: Product = {
        name: name,
        price: price,
        category: category,
      };
      const result = await ProductModel.insert(product);
      res.status(200).json({
        status: 200,
        response: {
          msg: "Product Inserted",
          inserted: 1,
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
}
