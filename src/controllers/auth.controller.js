import model from "../models/user.model.js";
import jwt from "jsonwebtoken";
import modelProduct from "../models/product.model.js";
import bcrypt from "bcryptjs";
import "dotenv/config";

const controller = {
  showHome: async(req, res) => {
    const productos = await modelProduct.getAllProducts()
    res.render("home", {
      title: "Inicio",
      productos
    });
  },
  showLogin: (req, res) => {
    res.render("login", {
      title: "Iniciar sesión",
    });
  },
  showRegister: (req, res) => {
    res.render("register", {
      title: "Crea tu cuenta",
    });
  },
  showAdmin: async(req, res) => {
    const productos = await modelProduct.getProductsByUser(req.usuario.id)
    res.render("admin", {
      
      title: "Panel de Administración",
      usuario: req.usuario,
      productos
    });
  },
  logout: (req, res)=>{
    res.clearCookie("token")
    res.redirect("/")
  },
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      //encriptar el password antes de guardarlo en la BBDD
      const hashPassword = await bcrypt.hash(password, 10);
      //guardar el password en la BBDD
      await model.createUser(email, hashPassword);
      res.redirect("/login");
    } catch (error) {
      res.status(500).send("Error al registrar el usuario");
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      //verificamos que estos datos esten en la BBDD
      const user = await model.getUserByEmail(email);
      if (!user) return res.status(401).send("Usuario No Encontrado");

      //nos traemos el password para comparar
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).send("contraseña incorrecta");
      //Generamos el token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" },
      );
      //guardamos el token y redirigimos
      res.cookie("token", token, { httpOnly: true });
      res.redirect("/admin");
    } catch (error) {
      res.status(500).send("Error al loguearse");
    }
  },
};

export default controller;
