import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/db.js";
import router from "./routes/router.js";
const app = express();
app.use(express.json());
dotenv.config();
app.use(cors())

app.use("/",router);

app.listen(5000, () => {
  connectDb();
  console.log("server started");
});
