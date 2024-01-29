import User from "../models/user.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({
                _id,
                fname,
                lname,
                username,
                occupation,
                location,
                picturePath,
            }) => {
                return {
                    _id,
                    fname,
                    lname,
                    username,
                    occupation,
                    location,
                    picturePath,
                };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({ error });
    }
};

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendID } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendID);
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendID);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({
                _id,
                fname,
                lname,
                username,
                occupation,
                location,
                picturePath,
            }) => {
                return {
                    _id,
                    fname,
                    lname,
                    username,
                    occupation,
                    location,
                    picturePath,
                };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({ error });
    }
};
