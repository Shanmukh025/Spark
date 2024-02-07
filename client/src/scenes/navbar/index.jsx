import {
    Close,
    DarkMode,
    LightMode,
    Menu as MenuIcon,
    NotificationsActiveRounded,
    Search,
} from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    InputBase,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { setLogout, setMode } from "../../state";
import messenger from "./messenger.svg";
import sparklogo from "./spark-logo.png";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1100px)");
    const theme = useTheme();
    const alt = theme.palette.background.alt;
    const fullName = `${user.firstName} ${user.lastName}`;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <FlexBetween padding="0.1rem 5%" backgroundColor={alt}>
            <FlexBetween gap="4rem">
                <img
                    src={sparklogo}
                    alt="logo"
                    onClick={() => navigate("/home")}
                    style={{
                        height: "80px",
                        width: "150px",
                        cursor: "pointer",
                    }}
                />
                {isNonMobileScreens && (
                    <FlexBetween
                        backgroundColor={theme.palette.neutral.light}
                        borderRadius="9px"
                        gap="2rem"
                        padding="0.3rem 1rem"
                        fontWeight="700"
                    >
                        <InputBase placeholder="Search Users..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <Tooltip title="Light Theme">
                                <LightMode
                                    sx={{
                                        color: theme.palette.neutral.dark,
                                        fontSize: "25px",
                                    }}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip title="Dark Theme">
                                <DarkMode sx={{ fontSize: "25px" }} />
                            </Tooltip>
                        )}
                    </IconButton>
                    <Tooltip title="Notifications">
                        <NotificationsActiveRounded
                            sx={{ fontSize: "25px", cursor: "pointer" }}
                        />
                    </Tooltip>
                    <button className="messagebtn">
                        <img
                            src={messenger}
                            alt="logo"
                            style={{
                                height: "20px",
                                width: "20px",
                                marginBottom: "-4px",
                                marginRight: "5px",
                            }}
                        />
                        Message
                    </button>
                    <div className="profile">
                        <Tooltip title="My Account">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={
                                    open ? "account-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                            >
                                <div className="user" value={{ fullName }}>
                                    <h3>{fullName}</h3>
                                </div>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    "& .MuiAvatar-root": {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    "&::before": {
                                        content: '""',
                                        display: "block",
                                        position: "absolute",
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: "background.paper",
                                        transform:
                                            "translateY(-50%) rotate(45deg)",
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{
                                horizontal: "right",
                                vertical: "top",
                            }}
                            anchorOrigin={{
                                horizontal: "right",
                                vertical: "bottom",
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                <Avatar /> Profile
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                </ListItemIcon>
                                Add account
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon
                                    onClick={() => dispatch(setLogout())}
                                >
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </FlexBetween>
            ) : (
                <FlexBetween gap="0.5rem">
                    <button className="messagebtn">
                        <img
                            src={messenger}
                            alt="logo"
                            style={{
                                height: "20px",
                                width: "20px",
                                marginBottom: "-4px",
                                marginRight: "5px",
                            }}
                        />
                        Message
                    </button>
                    <IconButton
                        onClick={() =>
                            setIsMobileMenuToggled(!isMobileMenuToggled)
                        }
                    >
                        <MenuIcon />
                    </IconButton>
                    {isMobileMenuToggled && (
                        <Box
                            position="fixed"
                            right="0"
                            bottom="0"
                            height="100%"
                            zIndex="10"
                            maxWidth="500px"
                            minWidth="300px"
                            backgroundColor={alt}
                        >
                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                p="1rem"
                            >
                                <IconButton
                                    onClick={() =>
                                        setIsMobileMenuToggled(
                                            !isMobileMenuToggled
                                        )
                                    }
                                >
                                    <Close />
                                </IconButton>
                            </Box>
                            <FlexBetween
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                gap="3rem"
                            >
                                <div className="profile">
                                    <div className="user" values={{ fullName }}>
                                        <h3>{fullName}</h3>
                                    </div>
                                </div>
                                <FlexBetween
                                    backgroundColor={
                                        theme.palette.neutral.light
                                    }
                                    borderRadius="9px"
                                    gap="1rem"
                                    padding="0.1rem 0.6rem"
                                >
                                    <InputBase placeholder="Search Users..." />
                                    <IconButton>
                                        <Search />
                                    </IconButton>
                                </FlexBetween>
                                <button className="alertsbtn">
                                    <img
                                        src="https://www.svgrepo.com/show/390671/profile-user-avatar-man-person.svg"
                                        alt="logo"
                                        style={{
                                            height: "25px",
                                            width: "25px",
                                            marginBottom: "-6px",
                                            marginRight: "5px",
                                        }}
                                    />
                                    Profile
                                </button>
                                <button className="alertsbtn">
                                    <img
                                        src="https://www.svgrepo.com/show/489066/notifications-active.svg"
                                        alt="logo"
                                        style={{
                                            height: "25px",
                                            width: "25px",
                                            marginBottom: "-6px",
                                            marginRight: "5px",
                                        }}
                                    />
                                    Alerts
                                </button>
                                <button className="alertsbtn">
                                    <img
                                        src="https://www.svgrepo.com/show/111206/settings.svg"
                                        alt="logo"
                                        style={{
                                            height: "25px",
                                            width: "25px",
                                            marginBottom: "-6px",
                                            marginRight: "5px",
                                        }}
                                    />
                                    Settings
                                </button>
                                <button
                                    className="alertsbtn"
                                    onClick={() => dispatch(setLogout())}
                                >
                                    <img
                                        src="https://www.svgrepo.com/show/509151/logout.svg"
                                        alt="logo"
                                        style={{
                                            height: "25px",
                                            width: "25px",
                                            marginBottom: "-6px",
                                            marginRight: "5px",
                                        }}
                                    />
                                    Logout
                                </button>
                                <IconButton
                                    onClick={() => dispatch(setMode())}
                                    sx={{ fontSize: "25px" }}
                                >
                                    {theme.palette.mode === "dark" ? (
                                        <LightMode
                                            sx={{
                                                color: theme.palette.neutral
                                                    .dark,
                                                fontSize: "25px",
                                            }}
                                        />
                                    ) : (
                                        <DarkMode sx={{ fontSize: "25px" }} />
                                    )}
                                </IconButton>
                            </FlexBetween>
                        </Box>
                    )}
                </FlexBetween>
            )}
        </FlexBetween>
    );
};

export default Navbar;
