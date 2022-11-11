import express from "express";
import AdminController from "../../controllers/AdminController";

const admins = express.Router();

admins.post("/register", AdminController.register);
admins.post("/login", AdminController.login);

export default admins;
