import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";

dotenv.config();

mongoose
    .connect(process.env.DB)
    .then(() => console.log("connected to Mongo"))
    .catch((err) => console.log(err));

const app = express();
app.use("/api/user", userRoute);

app.listen(3000, () => {
    console.log("server listening on port 3000");
});
