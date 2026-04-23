import path from "path";
import modelProduct from "../models/product.model.js";

const __dirname = path.resolve();

export const uploadsProduct = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se seleccionó ninguna imagen.");
    }
    const { nombre, precio_original, precio_oferta, descripcion } = req.body;
    const { foto } = req.files;
    const usuario_id = req.usuario.id; //Obtenido del JWT por el middleware de autenticación

    //Generamos un nombre para evitar que sobreescriban fotos con el mismo nombre
    const nombreArchivo = `${Date.now()}-${foto.name}`;
    const uploadPath = path.join(
      __dirname,
      "src/public/uploads",
      nombreArchivo,
    );

    //movemos el archivo a la carpeta publica

    await foto.mv(uploadPath);

    //Guardamos en la BBDD la ruta que usara la URL
    const url_imagen = `/uploads/${nombreArchivo}`;
    //guardamos todos  los datos en la BBDD
    await modelProduct.createProduct(
      nombre,
      precio_original,
      precio_oferta,
      descripcion,
      url_imagen,
      usuario_id,
    );
    res.redirect("/admin");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al guardar el producto");
  }
};

export const deleteProduct = async(req, res)=>{
  try {
    const { id} = req.params
    const usuario_id = req.usuario.id //Obtenido del JWT por el middleware
    const productoEliminado = await modelProduct.deleteProductById(id, usuario_id)
    if(!productoEliminado){
      return res.status(404).send("producto no encontrado o no autorizado")
    }
    res.redirect("/")
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el producto");
  }
}
