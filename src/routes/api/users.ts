import express from "express";
import UserController from "../../controllers/UserController";
import verifyRequest from "../../middleware/verifyRequest";

const users = express.Router();

users.get("", verifyRequest, UserController.index);
users.get("/:id", verifyRequest, UserController.show);
users.post("", verifyRequest, UserController.create);
users.put("/:id", verifyRequest, UserController.update);
users.delete("/:id", verifyRequest, UserController.delete);
users.post("/auth/register", UserController.register);
users.post("/auth/login", UserController.login);

export default users;
