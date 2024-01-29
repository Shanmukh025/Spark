import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true,
            max: 20,
        },
        lname: {
            type: String,
            required: true,
            max: 20,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            min: 5,
            max: 20,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            min: 5,
            max: 25,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 20,
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: [],
        },
        location: String,
        occupation: String,
        impressions: Number,
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
