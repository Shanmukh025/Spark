import { Box, Button, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const [displayedFriends, setDisplayedFriends] = useState(3);

    const getFriends = async () => {
        const response = await fetch(
            `https://spark-production-744e.up.railway.app/users/${userId}/friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    useEffect(() => {
        getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const showMoreFriends = () => {
        // Increase the number of displayed friends
        setDisplayedFriends(displayedFriends + 4);
    };

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friends List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {/* Display only the first 'displayedFriends' friends */}
                {friends.slice(0, displayedFriends).map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={`${friend.occupation}, ${friend.location}`}
                        userPicturePath={friend.picturePath}
                    />
                ))}
                {friends.length > displayedFriends && (
                    <Button onClick={showMoreFriends} color="primary">
                        Show All
                    </Button>
                )}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;
