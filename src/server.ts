import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import multer from "multer";
import cors from "cors";

const app = express();
const address: string = "localhost:3000";
const upload = multer();

app.use(bodyParser.json());
app.use(cors());
app.use(upload.none());
app.use("/api", router);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
