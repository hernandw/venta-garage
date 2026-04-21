import express from "express";
import controller from "../controllers/auth.controller.js";

const router = express.Router();

//Vista Principal
router.get("/", controller.showHome);

//Vista de login
router.get("/login", controller.showLogin);

//Vista de Registro
router.get("/register", controller.showRegister);
router.post("/api/auth/register", controller.register)

export default router;
