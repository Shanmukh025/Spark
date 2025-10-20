import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
    Alert,
    Box,
    Button,
    Snackbar,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Formik } from "formik";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state";
import * as yup from "yup";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("First Name is Required*"),
    lastName: yup.string().required("Last Name is Required*"),
    email: yup.string().email("Invalid Email*").required("Email is Required*"),
    password: yup.string().required("Password is Required*"),
    location: yup.string().required("Location is Required*"),
    occupation: yup.string().required("Occupation is Required*"),
    picture: yup.mixed().required("Profile Picture is Required*"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email*").required("Email is Required*"),
    password: yup.string().required("Password is Required*"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const [loading, setLoading] = useState(false);

    // Snackbar state
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "info",
    });

    const handleSnackbarClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    // ---------------------- REGISTER FUNCTION ----------------------
    const register = async (values, onSubmitProps) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("location", values.location);
            formData.append("occupation", values.occupation);
            formData.append("picture", values.picture);
            formData.append("picturePath", values.picture.name);

            const res = await fetch(
                "https://spark-yag0.onrender.com/auth/register",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!res.ok) {
                setSnackbar({
                    open: true,
                    message: "Something Went Wrong! Try Using Another Email.",
                    severity: "error",
                });
                setLoading(false);
                return;
            }

            const savedUser = await res.json();
            onSubmitProps.resetForm();
            setLoading(false);

            if (savedUser) {
                setSnackbar({
                    open: true,
                    message: "Spark ID Created! Login.",
                    severity: "success",
                });
                setPageType("login");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setSnackbar({
                open: true,
                message: "Something Went Wrong! Try Using Another Email.",
                severity: "error",
            });
            setLoading(false);
        }
    };

    // ---------------------- LOGIN FUNCTION ----------------------
    const login = async (values, onSubmitProps) => {
        try {
            setLoading(true);
            const res = await fetch(
                "https://spark-yag0.onrender.com/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                }
            );
            const loggedIn = await res.json();
            onSubmitProps.resetForm();
            setLoading(false);

            if (res.status === 200 && loggedIn.user && loggedIn.token) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token,
                    })
                );
                // Navigate to home and pass welcome flag
                navigate("/home", { state: { welcome: true } });
            } else if (res.status === 400) {
                setSnackbar({
                    open: true,
                    message: "Incorrect Credentials!",
                    severity: "error",
                });
            } else {
                setSnackbar({
                    open: true,
                    message: "Something Went Wrong! Try Again.",
                    severity: "error",
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            setSnackbar({
                open: true,
                message: "Something Went Wrong! Try Again.",
                severity: "error",
            });
            setLoading(false);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={
                    isLogin ? initialValuesLogin : initialValuesRegister
                }
                validationSchema={isLogin ? loginSchema : registerSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": {
                                    gridColumn: isNonMobile
                                        ? undefined
                                        : "span 4",
                                },
                            }}
                        >
                            {isRegister && (
                                <>
                                    <TextField
                                        label="First Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        name="firstName"
                                        error={
                                            Boolean(touched.firstName) &&
                                            Boolean(errors.firstName)
                                        }
                                        helperText={
                                            touched.firstName &&
                                            errors.firstName
                                        }
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        label="Last Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        name="lastName"
                                        error={
                                            Boolean(touched.lastName) &&
                                            Boolean(errors.lastName)
                                        }
                                        helperText={
                                            touched.lastName && errors.lastName
                                        }
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        label="Location"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.location}
                                        name="location"
                                        error={
                                            Boolean(touched.location) &&
                                            Boolean(errors.location)
                                        }
                                        helperText={
                                            touched.location && errors.location
                                        }
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        label="Occupation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.occupation}
                                        name="occupation"
                                        error={
                                            Boolean(touched.occupation) &&
                                            Boolean(errors.occupation)
                                        }
                                        helperText={
                                            touched.occupation &&
                                            errors.occupation
                                        }
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <Box
                                        gridColumn="span 4"
                                        border={`1px solid ${palette.neutral.medium}`}
                                        borderRadius="5px"
                                        p="1rem"
                                    >
                                        <Dropzone
                                            acceptedFiles=".jpg,.jpeg,.png"
                                            multiple={false}
                                            onDrop={(acceptedFiles) =>
                                                setFieldValue(
                                                    "picture",
                                                    acceptedFiles[0]
                                                )
                                            }
                                        >
                                            {({
                                                getRootProps,
                                                getInputProps,
                                            }) => (
                                                <Box
                                                    {...getRootProps()}
                                                    border={`2px dashed ${palette.primary.main}`}
                                                    p="1rem"
                                                    sx={{
                                                        "&:hover": {
                                                            cursor: "pointer",
                                                        },
                                                    }}
                                                >
                                                    <input
                                                        {...getInputProps()}
                                                    />
                                                    {!values.picture ? (
                                                        <p>
                                                            Add Profile Picture
                                                        </p>
                                                    ) : (
                                                        <FlexBetween>
                                                            <Typography>
                                                                {
                                                                    values
                                                                        .picture
                                                                        .name
                                                                }
                                                            </Typography>
                                                            <EditOutlinedIcon />
                                                        </FlexBetween>
                                                    )}
                                                </Box>
                                            )}
                                        </Dropzone>
                                    </Box>
                                </>
                            )}

                            <TextField
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={
                                    Boolean(touched.email) &&
                                    Boolean(errors.email)
                                }
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={
                                    Boolean(touched.password) &&
                                    Boolean(errors.password)
                                }
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>

                        <Box>
                            <Button
                                fullWidth
                                type="submit"
                                disabled={loading}
                                sx={{
                                    m: "2rem 0",
                                    p: "1rem",
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    "&:hover": { color: palette.primary.main },
                                }}
                            >
                                {loading
                                    ? isLogin
                                        ? "Logging You In..."
                                        : "Creating Your Spark ID..."
                                    : isLogin
                                    ? "LOGIN"
                                    : "REGISTER"}
                            </Button>

                            <Typography
                                onClick={() => {
                                    setPageType(isLogin ? "register" : "login");
                                    resetForm();
                                }}
                                sx={{
                                    color: palette.primary.main,
                                    "&:hover": {
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                {isLogin
                                    ? "New To Spark? Sign Up."
                                    : "Have an Account? Login."}
                            </Typography>
                        </Box>
                    </form>
                )}
            </Formik>

            {/* ---------------------- SNACKBAR ---------------------- */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Form;
