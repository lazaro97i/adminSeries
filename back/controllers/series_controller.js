import pool from "../config/database.js"

const controller = {

  create: async (req, res) => {

    const { titulo, descripcion, fechaEstreno, estrellas, genero, precioAlquiler, atp, estado } = req.body

    try {
      const nuevaSerie = await pool.query('INSERT INTO series (titulo, descripcion, fechaEstreno, estrellas, genero, precioAlquiler, atp, estado) values (?,?,?,?,?,?,?,?)', [titulo, descripcion, fechaEstreno, estrellas, genero, precioAlquiler, atp, estado])
      console.log(nuevaSerie)
      if (nuevaSerie) {
        return res.status(201).json({
          success: true,
          message: 'Serie agregada correctamente',
          data: nuevaSerie
        })
      }
    } catch (e) {
      console.log(e)
    }
  },

  read: async (req, res) => {

    try {
      const series = await pool.query('SELECT * FROM series')
      if (series) {
        res.status(200).json({
          success: true,
          message: 'Series encontradas',
          series: series
        })
      } else {
        res.status(400).json({
          success: false,
          message: 'No se encontraron series',
          data: null
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

}

export default controller