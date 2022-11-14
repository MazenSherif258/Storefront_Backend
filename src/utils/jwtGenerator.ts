import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { TOKEN_SECRET } = process.env;

const generateJWT = (username: string) => {
  const token = jwt.sign({ username: username }, TOKEN_SECRET as string, {
    expiresIn: "24h",
  });
  return token;
};

export default generateJWT;
