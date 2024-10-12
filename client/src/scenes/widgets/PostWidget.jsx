import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Divider,
    IconButton,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    createdAt,
}) => {
    const [isComments, setIsComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [isShareOpen, setIsShareOpen] = useState(false); // New state for share box
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;

    const patchLike = async () => {
        const response = await fetch(
            `https://spark-yag0.onrender.com/posts/${postId}/like`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: loggedInUserId }),
            }
        );
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        const response = await fetch(
            `https://spark-yag0.onrender.com/posts/${postId}/comments`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ comment: newComment }),
            }
        );

        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setNewComment("");
    };

    const formattedDate = "25 Jun 2024";

    const handleShareTwitter = (post) => {
        const url = `https://www.twitter.com/compose/post?text=Checkout this New Post from Spark :
        %0A%0A${encodeURIComponent(description)}`;
        window.open(url, "_blank");
    };

    // const handleShareLinkedIn = (post) => {
    // const url = `https://www.linkedin.com/shareArticle?summary=${encodeURIComponent(
    //     description
    // )}`;
    // window.open(url, "_blank");
    // };

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography
                color={main}
                sx={{ mt: "1rem", ml: "0.4rem", fontSize: "1rem" }}
            >
                {description}
            </Typography>
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`https://spark-yag0.onrender.com/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt="0.5rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: "#F70D1A" }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton onClick={() => setIsShareOpen(!isShareOpen)}>
                    {" "}
                    {/* Toggle share box */}
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography
                                sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}
                            >
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                    <Box display="flex" mt="1rem">
                        <TextField
                            fullWidth
                            label="Add A Comment"
                            value={newComment}
                            onChange={handleCommentChange}
                        />
                        <Button onClick={handleCommentSubmit}>Comment</Button>
                    </Box>
                </Box>
            )}
            {isShareOpen && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={handleShareTwitter}>
                        <img
                            style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "5px",
                            }}
                            src="https://upload.wikimedia.org/wikipedia/commons/9/95/Twitter_new_X_logo.png"
                            alt="Twitter"
                        />
                        Twitter
                    </Button>
                </Box>
            )}

            <Typography
                variant="caption"
                color="textSecondary"
                mt="25px"
                marginLeft="0.4rem"
            >
                {formattedDate} • Spark
            </Typography>
        </WidgetWrapper>
    );
};

export default PostWidget;
