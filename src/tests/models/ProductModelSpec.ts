import ProductModel, { Product } from "../../models/ProductModel";

const product: Product = {
  name: "PS5",
  price: 500,
  category: "Gaming",
};

describe("Product Model Tests", () => {
  it("Should Create a Product", async () => {
    const result = await ProductModel.create(product);
    expect(result.id).toBeGreaterThan(0);
    expect(result.name).toEqual(product.name);
    expect(result.price).toBeCloseTo(product.price);
    product.id = result.id;
  });

  it("Should Get Product by id", async () => {
    const result = await ProductModel.getProduct(product.id as number);
    expect(result.name).toEqual(product.name);
    expect(result.price).toBeCloseTo(product.price);
  });

  it("Should Get All Products", async () => {
    const result = await ProductModel.getProducts();
    expect(result).toBeTruthy();
  });

  it("Should Update a Product", async () => {
    product.name = "PS4";
    product.price = 200;
    const result = await ProductModel.update(product.id as number, product);
    expect(result.name).toEqual(product.name);
    expect(result.price).toBeCloseTo(product.price);
  });

  it("Should Delete a Product", async () => {
    const result = await ProductModel.delete(product.id as number);
    expect(result.name).toEqual(product.name);
    expect(result.price).toBeCloseTo(product.price);
  });
});
