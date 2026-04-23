import express from "express"
import { uploadsProduct, deleteProduct, editProduct } from "../controllers/product.controller.js"
import controller from '../controllers/auth.controller.js'
import { estaAutenticado } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post('/upload', estaAutenticado, uploadsProduct) //Guardando el producto en la BBDD

router.get("/detalle/:id", controller.showProductDetail)

router.get("/delete/:id", estaAutenticado, deleteProduct)

router.get("/admin/editar/:id", estaAutenticado, controller.showEditProductForm)

router.post("/edit/:id", estaAutenticado, editProduct)





export default router