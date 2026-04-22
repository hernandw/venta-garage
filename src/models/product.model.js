import pool from "../config/db.js";

const modelProduct = {
  createProduct: async (
    nombre,
    precio_original,
    precio_oferta,
    descripcion,
    url_imagen,
    usuario_id,
  ) => {
    const query = `INSERT INTO productos(nombre, precio_original, precio_oferta, descripcion, url_imagen, usuario_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [
      nombre,
      precio_original,
      precio_oferta,
      descripcion,
      url_imagen,
      usuario_id,
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },
  getAllProducts: async () => {
    const query = `
        SELECT p.*, u.email as vendedor 
        FROM productos p 
        JOIN usuarios u ON p.usuario_id = u.id 
        ORDER BY p.id DESC`;
    const { rows } = await pool.query(query);
    return rows;
  },
  getProductsByUser: async(usuario_id)=>{
    const query = "SELECT * FROM productos WHERE usuario_id = $1 ORDER BY id DESC";
    const { rows } = await pool.query(query, [usuario_id])
    return rows
  }
};

export default modelProduct;
