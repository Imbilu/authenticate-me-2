import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

mongoose
    .connect(process.env.DB)
    .then(() => console.log("connected to Mongo"))
    .catch((err) => console.log(err));

const __dirname = path.resolve();

const app = express();
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        message,
        statusCode,
    });
});

app.listen(3000, () => {
    console.log("server listening on port 3000");
});
