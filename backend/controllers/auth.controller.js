import { nextTick } from "process";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: "user created" });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    // const hashedPassword = bcryptjs.hashSync(password);
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User not found"));
        const validPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );
        if (!validPassword)
            return next(errorHandler(401, "Wrong username or password"));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...user } = validUser._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            expires: 604800 * 1000,
        }).json(user);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await user.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign(
                { id: validUser._id },
                process.env.JWT_SECRET
            );
            const { password: hashedPassword, ...user } = validUser._doc;
            res.cookie("access_token", token, {
                httpOnly: true,
                expires: 604800 * 1000,
            }).json(user);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const username = req.body.name.toLowerCase().replace(/\s+/g, "_");
            username += Math.floor(Math.random() * 9000) + 1000;
            const newUser = new User({
                username: username,
                email: req.body.email,
                password: hashedPassword,
                profilePic: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: hashedPassword2, ...user } = newUser._doc;
            res.cookie("access_token", token, {
                httpOnly: true,
                expires: 604800 * 1000,
            }).json(user);
        }
    } catch (error) {}
};
