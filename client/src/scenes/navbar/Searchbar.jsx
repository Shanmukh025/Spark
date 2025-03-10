import { Search } from "@mui/icons-material";
import {
    Box,
    Divider,
    IconButton,
    InputBase,
    List,
    ListItem,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ token }) => {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) {
                console.error("Token is missing!");
                return;
            }

            try {
                console.log("Fetching users...");
                const response = await fetch(
                    "https://xspark-production.up.railway.app/users",
                    {
                        method: "GET",
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (!response.ok) throw new Error("Failed to fetch users");

                const data = await response.json();
                console.log("Users fetched:", data);
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [token]);

    useEffect(() => {
        if (query.trim() === "") {
            setFilteredUsers([]);
        } else {
            const results = users.filter((user) =>
                `${user.firstName} ${user.lastName}`
                    .toLowerCase()
                    .includes(query.toLowerCase())
            );
            setFilteredUsers(results);
        }
    }, [query, users]);

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
        setQuery("");
        setFilteredUsers([]);
    };

    return (
        <Box position="relative">
            <Box
                backgroundColor={theme.palette.neutral.light}
                borderRadius="9px"
                gap="2rem"
                padding="0.3rem 1rem"
                fontWeight="700"
            >
                <InputBase
                    placeholder="Search Users..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{ flex: 1 }}
                />
                <IconButton>
                    <Search />
                </IconButton>
            </Box>

            {filteredUsers.length > 0 && (
                <List
                    sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: "100%",
                        backgroundColor: theme.palette.background.default,
                        borderRadius: "9px",
                        zIndex: 10,
                        color: theme.palette.text.primary,
                        border:
                            theme.palette.mode === "dark"
                                ? "1px solid rgba(255,255,255,0.2)"
                                : "none",
                    }}
                >
                    {filteredUsers.map((user, index) => (
                        <Box key={user._id}>
                            <ListItem
                                sx={{
                                    cursor: "pointer",
                                }}
                                onClick={() => handleUserClick(user._id)}
                            >
                                <Typography
                                    sx={{ color: theme.palette.text.primary }}
                                >
                                    {user.firstName} {user.lastName}
                                </Typography>
                            </ListItem>
                            {index < filteredUsers.length - 1 && (
                                <Divider
                                    sx={{
                                        backgroundColor: theme.palette.divider,
                                    }}
                                />
                            )}
                        </Box>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default SearchBar;
