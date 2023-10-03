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
  },

  getSerie: async (req, res) => {

    const { id } = req.params

    try {
      const serie = await pool.query('SELECT * FROM series WHERE codigo = ?', id)
      if (serie) {
        res.status(200).json({
          success: true,
          message: 'serie encontrada',
          data: serie[0]
        })
      } else {
        res.status(400).json({
          success: false,
          message: 'No se encontró serie',
          data: null
        })
      }
    } catch (e) {
      console.log(e)
    }
  },

  update: async (req, res) => {

    const { codigo, titulo, descripcion, atp, estrellas, fechaEstreno, genero, precioAlquiler } = req.body
    const fecha = new Date(fechaEstreno.split('-')[0], fechaEstreno.split('-')[1] - 1, fechaEstreno.split('-')[2])

    try {
      const serie = await pool.query("UPDATE series SET titulo=?, descripcion=?, atp=?, estrellas=?, fechaEstreno=?, genero=?, precioAlquiler=? WHERE codigo=?", [titulo, descripcion, atp, estrellas, fecha, genero, precioAlquiler, codigo])
      if (serie) {
        res.status(200).json({
          success: true,
          message: 'serie actualizada',
          data: serie
        })
      } else {
        res.status(400).json({
          success: false,
          message: 'No se pudo actualizar serie',
          data: null
        })
      }
    } catch (e) {
      console.log(e)
    }
  },

  cancelSerie: async (req, res) => {

    const { codigo, estado } = req.body

    try {
      const serie = await pool.query('UPDATE series SET estado=? WHERE codigo=?', [estado, codigo])
      if (serie) {
        res.status(200).json({
          success: true,
          message: 'Serie anulada correctamente',
          data: serie
        })
      } else {
        res.status(400).json({
          success: false,
          message: 'No se pudo anular la serie',
          data: null
        })
      }
    } catch (e) {
      console.log(e)
    }
  },

  deleteSerie: async (req, res) => {

    const { id } = req.params

    try {
      const serie = await pool.query('DELETE FROM series WHERE codigo=?', id)
      if (serie) {
        res.status(200).json({
          success: true,
          message: 'Serie eliminada correctamente',
          data: serie
        })
      } else {
        res.status(400).json({
          success: false,
          message: 'No se pudo eliminar la serie',
          data: null
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

}

export default controller