import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import user from "./routes/users";
dotenv.config();
const port = process.env.PORT || 3000;
const db_string = process.env.DB_STRING || "localhost:27017";

//datebase
mongoose.set("strictQuery", true);
//@ts-ignore
mongoose.connect(db_string, { useNewUrlParser: true });
const serve = mongoose.connection;
serve.on("error", (err) => console.log(err));
serve.once("open", () => console.log("db connected"));

//server
const app = express();
app.use(express.json());
app.use("/user", user);
app.listen(port, () => {
  console.log(`server → http://localhost:${port}`);
});
