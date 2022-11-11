import db from "../providers/database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  firstName: string;
  lastName: number;
  password: string;
};

export default class UserModel {
  static async getUsers(): Promise<User[]> {
    try {
      const sql = "SELECT * from users";
      const result = await db.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot Get Users ${err}`);
    }
  }

  static async getUser(id: number): Promise<User> {
    try {
      const sql = "SELECT * from users WHERE id = $1";
      const result = await db.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot Get User ${err}`);
    }
  }

  static async insert(user: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users(firstName, lastName, password) VALUES($1, $2, $3) RETURNING *";
      const hashedPass = bcrypt.hashSync(
        user.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      const result = await db.query(sql, [
        user.firstName,
        user.lastName,
        hashedPass,
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot Insert User ${err}`);
    }
  }
}
