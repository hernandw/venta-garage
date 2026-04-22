import express from "express";
import controller from "../controllers/auth.controller.js";
import { estaAutenticado } from "../middleware/auth.middleware.js";

const router = express.Router();

//Vista Principal
router.get("/", controller.showHome);

//Vista de login
router.get("/login", controller.showLogin); //muestra el formulario de Login
router.post("/api/auth/login", controller.login); //procesa los datos del Lohgin

//Vista de Registro
router.get("/register", controller.showRegister); //muestra el formulario de registro
router.post("/api/auth/register", controller.register); //procesa el registro en la BBDD

router.get("/admin", estaAutenticado, controller.showAdmin);

router.get("/api/auth/logout", controller.logout);

export default router;
