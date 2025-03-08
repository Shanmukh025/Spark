import { LocationOnOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(
            `https://xspark-production.up.railway.app/users/${userId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) {
        return null;
    }

    const { firstName, lastName, location, occupation, ig, friends } = user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.neutral.dark,
                                    cursor: "pointer",
                                },
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} Friends
                        </Typography>
                    </Box>
                </FlexBetween>
            </FlexBetween>

            <Divider />

            {/* SECOND ROW */}
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography fontWeight="500">{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined
                        fontSize="large"
                        sx={{ color: main }}
                    />
                    <Typography fontWeight="500">{occupation}</Typography>
                </Box>
            </Box>

            <Divider />

            {/* THIRD ROW */}
            {/* <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>
                        Who's viewed your profile
                    </Typography>
                    <Typography color={main} fontWeight="500">
                        {viewedProfile}
                    </Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>
                        Impressions of your post
                    </Typography>
                    <Typography color={main} fontWeight="500">
                        {impressions}
                    </Typography>
                </FlexBetween>
            </Box>

            <Divider /> */}

            {/* FOURTH ROW */}
            <Box p="1rem 0">
                <Typography
                    fontSize="1rem"
                    color={main}
                    fontWeight="500"
                    mb="1rem"
                >
                    Social Profiles
                </Typography>

                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween
                        gap="1rem"
                        sx={{
                            cursor: "pointer",
                            "&:hover": { color: palette.neutral.dark },
                        }}
                        onClick={() =>
                            window.open(
                                `https://instagram.com/${ig || ""}`,
                                "_blank"
                            )
                        }
                    >
                        <InstagramIcon fontSize="large" sx={{ color: main }} />
                        <Box>
                            <Typography fontWeight="600">
                                {ig || "Insta User"}
                            </Typography>
                        </Box>
                        <ArrowOutwardIcon sx={{ color: main }} />
                    </FlexBetween>
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    );
};

export default UserWidget;
