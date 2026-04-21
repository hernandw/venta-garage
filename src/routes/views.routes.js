import express from "express";

const router = express.Router();

const productos = [
  {
    id: 1,
    nombre: "Bicicleta Vintage",
    precio_original: 150000,
    precio_oferta: 85000,
    descripcion: "Bicicleta de paseo en excelente estado.",
    url_imagen: "images/bicicleta.jpg",
  },
  {
    id: 2,
    nombre: "Monitor Gaming 24'",
    precio_original: 200000,
    precio_oferta: 120000,
    descripcion: "Poco uso, 144hz, incluye cables.",
    url_imagen: "images/monitor.jpg",
  },
];

//Vista Principal
router.get("/", (req, res) => {
  res.render("home", {
    title: "Inicio",
    productos
  });
});

//Vista de login
router.get("/login", (req, res) => {
  res.render("login", {
    title: "Iniciar sesión",
  });
});

//Vista de Registro
router.get("/register", (req, res) => {
  res.render("register", {
    title: "Crea tu cuenta",
  });
});

export default router;
