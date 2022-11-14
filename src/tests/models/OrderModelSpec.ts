import OrderModel, { Order } from "../../models/OrderModel";
import UserModel, { User } from "../../models/UserModel";
import ProductModel, { Product } from "../../models/ProductModel";

const order: Order = {
  user_id: 1,
  status: "completed",
};

const product: Product = {
  name: "PS5",
  price: 500,
  category: "Gaming",
};

const user: User = {
  firstname: "Mazen",
  lastname: "Sherif",
  username: "mazona",
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

describe("Order Model Tests", () => {
  beforeAll(() => {
    // Create User and Product for Order Model Testing
    createUserTest();
    createProductTest();
  });
  it("Should Create an Order", async () => {
    const result = await OrderModel.create(order);
    expect(result.status).toEqual(order.status);
    expect(result.user_id).toEqual(order.user_id);
    order.id = result.id;
  });

  it("Should Get Order by id", async () => {
    const result = await OrderModel.getOrder(order.id as number);
    expect(result.status).toEqual(order.status);
    expect(result.user_id).toEqual(order.user_id);
  });

  it("Should Get All Orders", async () => {
    const result = await OrderModel.getOrders();
    expect(result).toBeTruthy();
  });

  it("Should Update an Order", async () => {
    order.status = "active";
    const result = await OrderModel.update(order.id as number, order);
    expect(result.status).toEqual(order.status);
  });

  it("Should Add Product to Order", async () => {
    const result = await OrderModel.addProduct(
      order.id as number,
      3,
      product.id as number
    );
    expect(result).toBeTruthy();
  });

  it("Should Get Current Order by User", async () => {
    const result = await OrderModel.getCurrentOrder(user.id as number);
    expect(result?.length).toBeGreaterThanOrEqual(1);
  });

  it("Should Remove Product from Order", async () => {
    const result = await OrderModel.removeProduct(
      order.id as number,
      product.id as number
    );
    expect(result).toBeTruthy();
  });

  it("Should Delete an Order", async () => {
    const result = await OrderModel.delete(order.id as number);
    expect(result.user_id).toEqual(order.user_id);
    expect(result.status).toEqual("active");
  });
});
