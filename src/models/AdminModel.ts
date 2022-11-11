import db from "../providers/database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type Admin = {
  id?: number;
  username: string;
  password: string;
};

export default class AdminModel {
  static async authenticate(
    username: string,
    password: string
  ): Promise<Admin | null> {
    try {
      const sql = "SELECT * from public.admins WHERE username = $1";
      const result = await db.query(sql, [username]);
      // check if admin exists
      if (result.rows.length) {
        const admin: Admin = result.rows[0];
        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, admin.password)) {
          admin.password = "**********";
          return admin;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Cannot Authenticate Admin ${err}`);
    }
  }

  static async insert(admin: Admin): Promise<Admin> {
    try {
      const sql =
        "INSERT INTO admins(username, password) VALUES ($1, $2) RETURNING *";
      const hashedPass = bcrypt.hashSync(
        admin.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      const result = await db.query(sql, [admin.username, hashedPass]);
      const adminRes: Admin = result.rows[0];
      adminRes.password = "**********";
      return adminRes;
    } catch (err) {
      throw new Error(`Cannot Register Admin ${err}`);
    }
  }
}
