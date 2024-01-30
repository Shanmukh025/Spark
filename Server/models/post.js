import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        fname: {
            type: String,
            max: 500,
        },
        lname: {
            type: String,
            max: 500,
        },
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: [],
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
