import db from "../providers/database";

export type Product = {
    id?: number,
    name: string,
    price: number,
    category?: string
};


export default class ProductModel {
  static async index(): Promise<Product[]> {
    try {
      const result = await db.query("SELECT * from products");
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot Get Products ${err}`);
    }
  }

    static async show(id: number): Promise<Product> {
        try {
            const result = await db.query("SELECT * from products WHERE id = $1", [id]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot Get Product ${err}`);
        }
    }
}
