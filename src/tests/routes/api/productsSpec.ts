import supertest from "supertest";
import app from "../../../server";
import { Product } from "../../../models/ProductModel";
import generateJWT from "../../../utils/jwtGenerator";

const request = supertest(app);

const tokenTest = generateJWT("test");

const product: Product = {
  name: "PS5",
  price: 500,
  category: "Gaming",
};

describe("Product Endpoints Tests", () => {
  it("Should Create a Product", async () => {
    const result = await request
      .post("/api/products")
      .send(product)
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(result.status).toBe(200);
    expect(result.body.response.data.name).toEqual(product.name);
  });

  it("Should Get Product by id", async () => {
    const result = await request.get("/api/products/1");
    expect(result.body.response.data.name).toEqual(product.name);
    expect(result.body.response.data.price).toBeCloseTo(product.price);
  });

  it("Should Get All Products", async () => {
    const result = await request.get("/api/products");
    expect(result.body.response.data).toBeTruthy();
  });

  it("Should Update a Product", async () => {
    product.name = "PS4";
    product.price = 200;
    const result = await request
      .put("/api/products/1")
      .send(product)
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(result.body.response.data.name).toEqual(product.name);
    expect(result.body.response.data.price).toBeCloseTo(product.price);
  });

  it("Should Delete a Product", async () => {
    const result = await request
      .delete("/api/products/1")
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(result.body.response.data.name).toEqual(product.name);
    expect(result.body.response.data.price).toBeCloseTo(product.price);
  });
});
