import { Router } from "express";
import path from "path";

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import authRouter from "./auth.router.js";

const router = Router();

router.get("/", (req, res) => {
    res.redirect("/register");
});

router.get("/admin-panel", (req, res) => {
    if(req.cookies["hasauthorized"]){
        res.sendFile(path.join(__dirname, "../../views/admin-panal.html"));
    }else{
        res.redirect("/admin-login");
    }
});

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../../views/registration-form.html"));
});

router.get("/admin-login", (req, res) => {
    res.sendFile(path.join(__dirname, "../../views/admin.login.html"));
});

router.use(authRouter);

export default router;