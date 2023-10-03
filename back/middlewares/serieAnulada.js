import pool from "../config/database.js"

const serieAnulada = async (req, res, next) => {

  const { codigo } = req.body
  console.log(codigo)
  const [serie] = await pool.query('SELECT * FROM series WHERE codigo=?', codigo)

  if (serie[0]?.estado === 'AN') {
    console.log(serie)
    return res.status(400).json({
      data: null,
      message: 'La serie se encuentra anulada',
      success: false
    })
  } else {
    next()
  }

}

export default serieAnulada