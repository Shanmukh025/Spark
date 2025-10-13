/* Shanmukh's Navbar Enhanced */
import {
    Close,
    DarkMode,
    LightMode,
    Menu as MenuIcon,
    NotificationsActiveRounded,
} from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import {
    Box,
    Fade,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { setLogout, setMode } from "../../state";
import messenger from "./messenger.svg";
import SearchBar from "./Searchbar";
import sparklogo from "./spark-logo.png";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1100px)");
    const theme = useTheme();
    const alt = theme.palette.background.alt;
    const fullName = `${user.firstName} ${user.lastName}`;

    const [anchorEl, setAnchorEl] = useState(null);
    const [notifAnchor, setNotifAnchor] = useState(null);

    const openProfileMenu = Boolean(anchorEl);
    const openNotifMenu = Boolean(notifAnchor);

    const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
    const handleNotifClick = (event) => setNotifAnchor(event.currentTarget);

    const handleCloseProfile = () => setAnchorEl(null);
    const handleCloseNotif = () => setNotifAnchor(null);

    return (
        <FlexBetween padding="0.1rem 5%" backgroundColor={alt}>
            {/* Left Section */}
            <FlexBetween gap="4rem">
                <img
                    src={sparklogo}
                    alt="logo"
                    onClick={() => navigate("/home")}
                    style={{
                        height: "80px",
                        width: "150px",
                        cursor: "pointer",
                        transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                        (e.target.style.transform = "scale(1.02)")
                    }
                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                />
                {isNonMobileScreens && <SearchBar token={token} />}
            </FlexBetween>

            {/* Right Section */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    {/* Theme Toggle */}
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <Tooltip title="Light Theme" placement="bottom">
                                <LightMode
                                    sx={{
                                        color: theme.palette.neutral.dark,
                                        fontSize: "25px",
                                    }}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip title="Dark Theme" placement="bottom">
                                <DarkMode sx={{ fontSize: "25px" }} />
                            </Tooltip>
                        )}
                    </IconButton>

                    {/* 🔔 Notifications */}
                    <Tooltip title="Notifications" placement="bottom">
                        <IconButton onClick={handleNotifClick}>
                            <NotificationsActiveRounded
                                sx={{ fontSize: "25px", cursor: "pointer" }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={notifAnchor}
                        open={openNotifMenu}
                        onClose={handleCloseNotif}
                        TransitionComponent={Fade}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                mt: 1.5,
                                backgroundColor:
                                    theme.palette.background.default,
                                color: theme.palette.text.primary,
                                borderRadius: "9px",
                                padding: "0.9rem 1.5rem",
                                minWidth: "220px",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                "&::before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        }}
                        anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                        }}
                        transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign: "center",
                                color: theme.palette.text.secondary,
                                fontWeight: 700,
                            }}
                        >
                            Welcome to Spark, {fullName}!
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: "center",
                                color: theme.palette.text.secondary,
                                fontWeight: 500,
                                mt: "0.9rem",
                            }}
                        >
                            No New Notifications.
                        </Typography>
                    </Menu>

                    {/* 💬 Messages */}
                    <Tooltip title="Coming Soon!" placement="bottom">
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
                    </Tooltip>

                    {/* 👤 Profile */}
                    <div className="profile">
                        <Tooltip title={fullName} placement="bottom">
                            <h3 onClick={handleProfileClick}>{fullName}</h3>
                        </Tooltip>
                        <Tooltip title="My Account" placement="bottom">
                            <IconButton
                                onClick={handleProfileClick}
                                size="small"
                                sx={{ ml: 2 }}
                                style={{
                                    marginLeft: "-12px",
                                    marginTop: "-7px",
                                }}
                            >
                                <div className="user">
                                    <h4>▾</h4>
                                </div>
                            </IconButton>
                        </Tooltip>

                        {/* Account Menu */}
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={openProfileMenu}
                            onClose={handleCloseProfile}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
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
                            <MenuItem onClick={() => navigate(`/`)}>
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                </ListItemIcon>
                                Add account
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </FlexBetween>
            ) : (
                /* Mobile Layout */
                <FlexBetween gap="0.5rem">
                    <button className="messagebtn">
                        <img
                            src={messenger}
                            alt="logo"
                            style={{
                                height: "20px",
                                width: "20px",
                                marginBottom: "-4px",
                            }}
                        />
                    </button>
                    <Tooltip title="Notifications" placement="bottom">
                        <IconButton onClick={handleNotifClick}>
                            <NotificationsActiveRounded
                                sx={{ fontSize: "25px", cursor: "pointer" }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={notifAnchor}
                        open={openNotifMenu}
                        onClose={handleCloseNotif}
                        TransitionComponent={Fade}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                mt: 1.5,
                                backgroundColor:
                                    theme.palette.background.default,
                                color: theme.palette.text.primary,
                                borderRadius: "9px",
                                padding: "0.9rem 1.5rem",
                                minWidth: "220px",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                "&::before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        }}
                        anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                        }}
                        transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign: "center",
                                color: theme.palette.text.secondary,
                                fontWeight: 700,
                            }}
                        >
                            Welcome to Spark, {fullName}!
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: "center",
                                color: theme.palette.text.secondary,
                                fontWeight: 500,
                                mt: "0.9rem",
                            }}
                        >
                            No New Notifications.
                        </Typography>
                    </Menu>
                    <IconButton
                        onClick={() =>
                            setIsMobileMenuToggled(!isMobileMenuToggled)
                        }
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Mobile Side Menu */}
                    {isMobileMenuToggled && (
                        <>
                            {/* Backdrop Blur */}
                            <Box
                                position="fixed"
                                top={0}
                                left={0}
                                width="100vw"
                                height="100vh"
                                bgcolor="rgba(0,0,0,0.3)"
                                backdropFilter="blur(3px)"
                                zIndex={1200}
                                onClick={() => setIsMobileMenuToggled(false)}
                            />

                            <Box
                                position="fixed"
                                right="0"
                                top="0"
                                height="100%"
                                width="280px"
                                backgroundColor={
                                    theme.palette.background.default
                                }
                                zIndex={1300}
                                boxShadow="rgba(0,0,0,0.4) 0px 0px 15px"
                                sx={{
                                    transition: "transform 0.3s ease-in-out",
                                    borderLeft:
                                        theme.palette.mode === "dark"
                                            ? "1px solid rgba(255,255,255,0.2)"
                                            : "1px solid rgba(0,0,0,0.1)",
                                }}
                            >
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    p="1rem"
                                >
                                    <IconButton
                                        onClick={() =>
                                            setIsMobileMenuToggled(false)
                                        }
                                        sx={{
                                            color: theme.palette.text.primary,
                                        }}
                                    >
                                        <Close />
                                    </IconButton>
                                </Box>

                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    gap="1.5rem"
                                    p="2rem 1rem"
                                >
                                    <Typography
                                        onClick={handleProfileClick}
                                        sx={{
                                            cursor: "pointer",
                                            fontWeight: 1000,
                                            fontSize: "1.2rem",
                                            color: theme.palette.text.primary,
                                        }}
                                    >
                                        {fullName}
                                    </Typography>
                                    <IconButton
                                        onClick={() => dispatch(setMode())}
                                        sx={{
                                            color: theme.palette.text.primary,
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        {theme.palette.mode === "dark" ? (
                                            <LightMode sx={{ mr: 1 }} />
                                        ) : (
                                            <DarkMode sx={{ mr: 1 }} />
                                        )}
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontSize: "1rem",
                                                fontWeight: 400,
                                            }}
                                        >
                                            Theme
                                        </Typography>
                                    </IconButton>

                                    <MenuItem
                                        onClick={() => {
                                            navigate(`/`);
                                            setIsMobileMenuToggled(false);
                                        }}
                                        sx={{
                                            color: theme.palette.text.primary,
                                        }}
                                    >
                                        <PersonAdd sx={{ mr: 1 }} /> Add Account
                                    </MenuItem>

                                    <MenuItem
                                        onClick={() => {
                                            dispatch(setLogout());
                                            setIsMobileMenuToggled(false);
                                        }}
                                        sx={{
                                            color: theme.palette.text.primary,
                                        }}
                                    >
                                        <Logout sx={{ mr: 1 }} /> Logout
                                    </MenuItem>
                                </Box>
                            </Box>
                        </>
                    )}
                </FlexBetween>
            )}
        </FlexBetween>
    );
};

export default Navbar;
