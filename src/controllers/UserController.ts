import { Request, Response } from "express";
import UserModel, { User } from "../models/UserModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { TOKEN_SECRET } = process.env;

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
        res.status(200).json({
          status: 200,
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
        res.status(200).json({
          status: 200,
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

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, username, password } = req.body;
      if (Array.isArray(firstName)) {
        let users: User[] = [];
        for (let i = 0; i < firstName.length; i++) {
          const user: User = {
            firstName: firstName[i],
            lastName: lastName[i],
            username: username[i],
            password: password[i],
          };
          const result = await UserModel.insert(user);
          users.push(result);
        }
        res.status(200).json({
          status: 200,
          response: {
            msg: "Created Successfully!",
            data: users,
          },
        });
      } else {
        const user: User = {
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: password,
        };
        const result = await UserModel.insert(user);
        res.status(200).json({
          status: 200,
          response: {
            msg: "Created Successfully!",
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

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { firstName, lastName, username, password } = req.body;
      const user: User = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      };
      const result = await UserModel.update(id, user);
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

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await UserModel.delete(id);
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

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const result = await UserModel.authenticate(username, password);
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
        res.status(401).json({
          status: 401,
          response: {
            msg: "Username or Password is incorrect!",
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
      const { firstName, lastName, username, password } = req.body;
      const user: User = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      };
      const result = await UserModel.insert(user);
      const token = jwt.sign(
        { name: user.firstName, username: result.username },
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
            user: result,
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
