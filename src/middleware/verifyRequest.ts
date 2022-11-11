import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { TOKEN_SECRET } = process.env;

// Middleware to verify if the incoming request has access to the requested endpoint
const verifyRequest = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (token) {
    try {
      jwt.verify(token, TOKEN_SECRET as string);
      next();
    } catch (err) {
      res.status(401).json({
        status: 401,
        response: {
          msg: "Unauthorized Access!",
        },
      });
    }
  } else {
    res.status(401).json({
      status: 401,
      response: {
        msg: "Unauthorized Access!",
      },
    });
  }
};

export default verifyRequest;
