import supertest from "supertest";
import app from "../../../server";
import { Order } from "../../../models/OrderModel";
import generateJWT from "../../../utils/jwtGenerator";
import UserModel, { User } from "../../../models/UserModel";
import ProductModel, { Product } from "../../../models/ProductModel";

const order: Order = {
  user_id: 3,
  status: "active",
};

const product: Product = {
  name: "PS5",
  price: 500,
  category: "Gaming",
};

const user: User = {
  firstname: "Ahmed",
  lastname: "Sherif",
  username: "hamada",
  password: "12415",
};

const createUserTest = async () => {
  const result = await UserModel.insert(user);
  user.id = result.id;
};

const createProductTest = async () => {
  const result = await ProductModel.create(product);
  product.id = result.id;
};

const tokenTest = generateJWT("test");

const request = supertest(app);

describe("Order Endpoints Tests", () => {
  beforeAll(() => {
    // Create User and Product for Order Endpoint Testing
    createUserTest();
    createProductTest();
  });
  it("Should Create an Order", async () => {
    const result = await request
      .post("/api/orders")
      .send(order)
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(result.status).toEqual(200);
    expect(result.body.response.data.status).toEqual(order.status);
    order.id = result.body.response.data.id;
  });

  it("Should Get Order by id", async () => {
    const result = await request.get(`/api/orders/${order.id}`);
    expect(result.body.response.data.status).toEqual(order.status);
  });

  it("Should Get All Orders", async () => {
    const result = await request.get("/api/orders");
    expect(result.body.response.data).toBeTruthy();
  });

  it("Should Update an Order", async () => {
    const result = await request
      .put(`/api/orders/${order.id}`)
      .send(order)
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(result.body.response.data.user_id).toEqual(order.user_id);
    expect(result.body.response.data.status).toEqual(order.status);
  });

  it("Should Add Product to Order", async () => {
    const result = await request
      .post(`/api/orders/${order.id}/products`)
      .send({ product_id: product.id, quantity: 4, order_id: order.id })
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(result.status).toBe(200);
    expect(result).toBeTruthy();
  });

  it("Should Get Current Order by User", async () => {
    const result = await request
      .get(`/api/orders/currentOrder/${user.id}`)
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(result.body.response.data.length).toBeGreaterThanOrEqual(1);
  });

  it("Should Remove Product from Order", async () => {
    const result = await request
      .delete(`/api/orders/${order.id}/products/${product.id}`)
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(result).toBeTruthy();
  });

  it("Should Delete an Order", async () => {
    const result = await request
      .delete(`/api/orders/${order.id}`)
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(result.body.response.data.id).toBe(order.id);
  });
});
