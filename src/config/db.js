import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;

const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_DATABASE,
  port: DB_PORT,
  allowExitOnIdle: true, //cierra la conexión cuando no hay consultas
});

try {
  await pool.query("SELECT NOW()");
  console.log("✅ Base de Datos conectada");
} catch (error) {
  console.error("❌ Error en la conexión", error);
}

export default pool;
