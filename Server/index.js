import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assests", express.static(path.join(__dirname, "public/assests")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assests");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage });

const PORT = process.env.PORT || 6001;

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} didn't connect`));
