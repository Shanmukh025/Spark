import mongoose from "mongoose";

const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];

export const users = [
    {
        fname: "Shanmukh",
        lname: "Anaparthi",
        email: "shanmukh2564@gmail.com",
        username: "shanmukh",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p1.jpeg",
        friends: [],
        location: "India",
        occupation: "Spark Owner",
        impressions: 1234,
    },
    {
        fname: "Spark",
        lname: "Admin",
        email: "admin@spark.com",
        username: "admin",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "admin.jpeg",
        friends: [],
        location: "India",
        occupation: "Spark Admin",
        impressions: 6789,
    },
];
export const posts = [
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[1],
        fname: "Steve",
        lname: "Ralph",
        location: "New York, CA",
        description: "Some really long random description",
        picturePath: "post1.jpeg",
        userPicturePath: "p3.jpeg",
        likes: new Map([
            [userIds[0].toString(), true],
            [userIds[2].toString(), true],
            [userIds[3].toString(), true],
            [userIds[4].toString(), true],
        ]),
        comments: [
            "random comment",
            "another random comment",
            "yet another random comment",
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[3],
        fname: "Whatcha",
        lname: "Doing",
        location: "Korea, CA",
        description:
            "Another really long random description. This one is longer than the previous one.",
        picturePath: "post2.jpeg",
        userPicturePath: "p6.jpeg",
        likes: new Map([
            [userIds[0].toString(), true],
            [userIds[2].toString(), true],
            [userIds[4].toString(), true],
            [userIds[1].toString(), true],
        ]),
        comments: [
            "one more random comment",
            "and another random comment",
            "no more random comments",
            "I lied, one more random comment",
        ],
    },
    // Add more posts as needed
];
