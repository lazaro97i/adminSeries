import { createPool } from "mysql2/promise"

const pool = createPool({

  host: 'localhost',
  user: 'root',
  password: 'admin23i',
  port: 3306,
  database: 'adminseries'

})

pool.getConnection()
  .then(() => console.log('Database conected'))
  .catch((e) => console.log(e))


export default pool


