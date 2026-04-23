import express from "express"
import { uploadsProduct } from "../controllers/product.controller.js"
import controller from '../controllers/auth.controller.js'
import { estaAutenticado } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post('/upload', estaAutenticado, uploadsProduct) //Guardando el producto en la BBDD

router.get("/detalle/:id", controller.showProductDetail)



export default router