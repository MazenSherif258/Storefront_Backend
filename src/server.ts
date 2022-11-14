import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const { BACKEND_PORT } = process.env;
const port = BACKEND_PORT || 3000;

const app = express();
const address: string = "localhost:" + port;
const upload = multer();

app.use(bodyParser.json());
app.use(cors());
app.use(upload.none());
app.use("/api", router);

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
