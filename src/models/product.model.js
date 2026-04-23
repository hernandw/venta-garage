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
  getProductsByUser: async (usuario_id) => {
    const query =
      "SELECT * FROM productos WHERE usuario_id = $1 ORDER BY id DESC";
    const { rows } = await pool.query(query, [usuario_id]);
    return rows;
  },
  getProductByIdWithVendor: async (id) => {
    const query = `
    SELECT p.*, u.email as vendedor 
        FROM productos p 
        JOIN usuarios u ON p.usuario_id = u.id 
        WHERE p.id = $1`;

    const { rows } = await pool.query(query, [id]);
    return rows[0]; //retornamos el objeto
  },
  deleteProductById: async (id, usuario_id) => {
    const query =
      "DELETE FROM productos WHERE id = $1 AND usuario_id = $2 RETURNING *";
    const { rows } = await pool.query(query, [id, usuario_id]);
    return rows[0];
  },
  updateProductById: async (id, usuario_id, data) => {
    //Desestructurar el objeto "data" que viene del controlador
    const { nombre, precio_original, precio_oferta, descripcion, url_imagen } =
      data;
       const query = `
      UPDATE productos 
      SET nombre = $1, precio_original = $2, precio_oferta = $3, descripcion = $4, url_imagen = $5
      WHERE id = $6 AND usuario_id = $7
      RETURNING *`;

      const values = [nombre, precio_original, precio_oferta, descripcion, url_imagen, id, usuario_id]
      const { rows } = await pool.query(query, values)
      return rows[0]
  },
};

export default modelProduct;
