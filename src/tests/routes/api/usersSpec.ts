import UserModel, { User } from "../../../models/UserModel";
import supertest from "supertest";
import app from "../../../server";
import generateJWT from "../../../utils/jwtGenerator";

const request = supertest(app);

const user: User = {
  firstname: "Mazen",
  lastname: "Sherif",
  username: "mazzuo",
  password: "mazzuo123",
};

const tokenTest = generateJWT(user.username);

describe("User Endpoints Tests", () => {
  it("Should Create N Users", async () => {
    const result = await request
      .post("/api/users")
      .send(user)
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(result.status).toBe(200);
    user.id = result.body.response.data.id;
  });

  it("Should Get User by id", async () => {
    const result = await request
      .get(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(result.body.response.data.username).toEqual(user.username);
  });

  it("Should Get All Users", async () => {
    const result = await request
      .get("/api/users")
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(result).toBeTruthy();
  });

  it("Should Update a user", async () => {
    user.firstname = "Ahmed";
    user.lastname = "Sherif";
    const result = await request
      .put(`/api/users/${user.id}`)
      .send(user)
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(result.body.response.data.firstname).toEqual("Ahmed");
    expect(result.body.response.data.lastname).toEqual("Sherif");
  });

  it("Should Register a User", async () => {
    const result = await request
      .post("/api/users/auth/register")
      .send({
        firstname: "sherif",
        lastname: "larry",
        username: "cat",
        password: "cat123",
      })
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(result.body.response.data.token).not.toBeNull();
  });

  it("Should Login a User", async () => {
    const result = await request
      .post("/api/users/auth/login")
      .send({
        username: "cat",
        password: "cat123",
      })
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(result.body.response.data.token).not.toBeNull();
  });

  it("Should Delete a User", async () => {
    const result = await request
      .delete(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(result).toBeTruthy();
  });
});
