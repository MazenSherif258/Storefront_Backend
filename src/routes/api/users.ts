import express from "express";
import UserController from "../../controllers/UserController";
import verifyRequest from "../../middleware/verifyRequest";

const users = express.Router();

users.use(verifyRequest);

users.get("", UserController.index);
users.get("/:id", UserController.show);
users.post("", UserController.create);

export default users;
