import db from "../providers/database";

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export default class OrderModel {
  static async getOrders(): Promise<Order[]> {
    try {
      const sql = "SELECT * from orders";
      const result = await db.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot Get Orders ${err}`);
    }
  }
  static async getOrder(id: number): Promise<Order> {
    try {
      const sql = "SELECT * from orders WHERE id = $1";
      const result = await db.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot Get Order ${err}`);
    }
  }

  static async create(order: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders(user_id, status) VALUES($1, $2) RETURNING *";
      const result = await db.query(sql, [order.user_id, order.status]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot Create Order ${err}`);
    }
  }

  static async update(id: number, order: Order): Promise<Order> {
    try {
      const sql =
        "UPDATE orders set user_id = $1, status = $2 WHERE id = $3 RETURNING *";
      const result = await db.query(sql, [order.user_id, order.status, id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot Update Order ${err}`);
    }
  }

  static async delete(id: number): Promise<Order> {
    try {
      const sql = "DELETE from orders WHERE id = $1 RETURNING *";
      const result = await db.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot Delete Order ${err}`);
    }
  }

  static async getCurrentOrder(user_id: number): Promise<Order> {
    try {
      const sql =
        "SELECT op.order_id, op.product_id, op.quantity, o.status from order_product op INNER JOIN orders o on o.id = op.order_id and o.user_id = $1 WHERE o.status = $2";
      const result = await db.query(sql, [user_id, "active"]);
      const order = result.rows[0];
      if (order) {
        const product = await db.query("SELECT * from products WHERE id = $1", [
          order.product_id,
        ]);
        order.product = product.rows[0];
      }
      return order;
    } catch (err) {
      throw new Error(`Cannot Get Order ${err}`);
    }
  }
}
