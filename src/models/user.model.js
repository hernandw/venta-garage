import pool from '../config/db.js'


const model = {
    createUser: async(email, password)=>{
        const query = "INSERT into usuarios(email, password) VALUES ($1, $2) RETURNING *"
        const values = [email, password]

        const { rows} = await pool.query(query, values)
        return rows[0]
    },
    getUserByEmail: async(email)=>{
        const query = "SELECT * FROM usuarios WHERE email = $1"
        const { rows } = await pool.query(query, [email])
        return rows[0]
    }
}

export default model