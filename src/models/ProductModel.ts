import db from "../providers/database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export default class ProductModel {
  static async getProducts(): Promise<Product[]> {
    try {
      const result = await db.query("SELECT * from products");
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot Get Products ${err}`);
    }
  }

  static async getProduct(id: number): Promise<Product> {
    try {
      const sql = "SELECT * from products WHERE id = $1";
      const result = await db.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot Get Product ${err}`);
    }
  }

  static async insert(product: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products(name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const result = await db.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot Insert Product ${err}`);
    }
  }
}
