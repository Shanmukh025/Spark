import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import sparklogo from "../navbar/spark-logo.png";

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <Box>
            <Box
                width="100%"
                backgroundColor={theme.palette.background.alt}
                p="0.1rem 5%"
                textAlign="center"
            >
                <img
                    src={sparklogo}
                    alt="spark-logo"
                    style={{ height: "90px", width: "180px" }}
                />
            </Box>

            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    Welcome to Spark, By Shanmukh. Spark Your Moments!
                </Typography>
                <Form />
            </Box>
        </Box>
    );
};

export default LoginPage;
