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
};

export default modelProduct;
