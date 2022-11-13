import UserModel, { User } from "../../models/UserModel";

const user: User = {
  firstname: "Mazen",
  lastname: "Sherif",
  username: "mazonawar",
  password: "mazona123",
};

describe("User Model Tests", () => {
  it("Should Create N Users", async () => {
    const result = await UserModel.insert(user);
    expect(result.id).toBeGreaterThan(0);
    expect(result.firstname).toEqual(user.firstname);
    expect(result.lastname).toBeTruthy();
    user.id = result.id;
  });

  it("Should Get User by id", async () => {
    const result = await UserModel.getUser(user.id as number);
    expect(result.firstname).toEqual(user.firstname);
    expect(result.lastname).toEqual(user.lastname);
  });

  it("Should Get All Users", async () => {
    const result = await UserModel.getUsers();
    expect(result).toBeTruthy();
  });

  it("Should Update a user", async () => {
    user.firstname = "Ahmed";
    user.lastname = "Sherif";
    const result = await UserModel.update(user.id as number, user);
    expect(result.firstname).toEqual("Ahmed");
    expect(result.lastname).toEqual("Sherif");
  });

  it("Should Authenticate a User", async () => {
    const result = await UserModel.authenticate(user.username, user.password);
    expect(result).not.toBeNull();
  });

  it("Should Delete a User", async () => {
    const result = await UserModel.delete(user.id as number);
    expect(result).toBeTruthy();
  });
});
