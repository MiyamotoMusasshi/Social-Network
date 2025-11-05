import express from "express";
import cors from "cors";
import { __dirname } from "./localStorage.ts";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use(cookieParser());

export default app;
