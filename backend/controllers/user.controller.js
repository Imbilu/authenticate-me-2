import { request } from "express";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
    res.json({
        message: "user API",
    });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(
            errorHandler(401, "You're not authorized to perform this action")
        );
    }
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePic: req.body.profilePic,
                },
            },
            { new: true }
        );
        const { password, ...user } = updatedUser._doc;
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(
            errorHandler(401, "You're not authorized to perform this action")
        );
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.json("Account deleted");
    } catch (error) {
        next(error);
    }
};
