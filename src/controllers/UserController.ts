import { Request, Response } from "express";
import UserModel, { User } from "../models/UserModel";

export default class UserController {
  static async index(_req: Request, res: Response): Promise<void> {
    try {
      const result = await UserModel.getUsers();
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
            msg: "No Users Were Found!",
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
      const result = await UserModel.getUser(id);
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
            msg: "User Not Found!",
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

  static async create(req: Request, res: Response) {
    try {
      const { firstName, lastName, password } = req.body;
      const product: User = {
        firstName: firstName,
        lastName: lastName,
        password: password,
      };
      const result = await UserModel.insert(product);
      res.status(200).json({
        status: 200,
        response: {
          msg: "User Inserted",
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
