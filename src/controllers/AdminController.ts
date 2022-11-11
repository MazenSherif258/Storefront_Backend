import { Request, Response } from "express";
import AdminModel, { Admin } from "../models/AdminModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { TOKEN_SECRET } = process.env;

export default class AdminController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const result = await AdminModel.authenticate(username, password);
      if (result) {
        const token = jwt.sign(
          { username: result.username },
          TOKEN_SECRET as string,
          {
            expiresIn: "24h",
          }
        );
        res.status(200).json({
          status: 200,
          response: {
            msg: "Login Success!",
            data: {
              admin: result,
              token: token,
            },
          },
        });
      } else {
        res.status(404).json({
          status: 404,
          response: {
            msg: "Username or Password is incorrect!",
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

  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const admin: Admin = {
        username: username,
        password: password,
      };
      const result = await AdminModel.insert(admin);
      const token = jwt.sign(
        { username: result.username },
        TOKEN_SECRET as string,
        {
          expiresIn: "24h",
        }
      );
      res.status(200).json({
        status: 200,
        response: {
          msg: "Register Success!",
          data: {
            admin: result,
            token: token,
          },
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
