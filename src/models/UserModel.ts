import db from "../providers/database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
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
        "INSERT INTO users(firstName, lastName, username, password) VALUES($1, $2, $3, $4) RETURNING *";
      const hashedPass = bcrypt.hashSync(
        user.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      const result = await db.query(sql, [
        user.firstname,
        user.lastname,
        user.username,
        hashedPass,
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot Insert User ${err}`);
    }
  }

  static async update(id: number, user: User): Promise<User> {
    try {
      const sql =
        "UPDATE users set firstName = $1, lastName = $2, username = $3, password = $4 WHERE id = $5 RETURNING *";
      const hashedPass = bcrypt.hashSync(
        user.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      const result = await db.query(sql, [
        user.firstname,
        user.lastname,
        user.username,
        hashedPass,
        id,
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot Insert User ${err}`);
    }
  }

  static async delete(id: number): Promise<User> {
    try {
      const sql = "DELETE from users WHERE id = $1 RETURNING *";
      const result = await db.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot Delete User ${err}`);
    }
  }

  static async authenticate(
    username: string,
    password: string
  ): Promise<User | null> {
    try {
      const sql = "SELECT * from users WHERE username = $1";
      const result = await db.query(sql, [username]);
      // check if user exists
      if (result.rows.length) {
        const user: User = result.rows[0];
        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Cannot Authenticate Admin ${err}`);
    }
  }
}
