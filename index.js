import express from "express";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/assets"));
app.use(cookieParser());

dotenv.config();

import mainRouter from "./api/routers/main.router.js";

app.use(mainRouter);

app.listen(3000, error => {
    if(error) console.log(error);
});