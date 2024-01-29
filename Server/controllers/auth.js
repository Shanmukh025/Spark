import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
    try {
        const {
            fname,
            lname,
            username,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fname,
            lname,
            username,
            email,
            password: hasedPassword,
            picturePath,
            friends,
            location,
            occupation,
            impressions: Math.floor(Math.random() * 1000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const login = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) return res.status(404).json({ msg: "User not found" });
        const validPassword = await bcrypt.compare(password, user.password);
    } catch (err) {
        res.status(500).json(err);
    }
};
