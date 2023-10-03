import express from 'express'
import controller from '../controllers/series_controller.js'
import schema from '../schemas/series_schema.js'
import validatorSchema from '../middlewares/validatorSchema.js'
import serieAnulada from '../middlewares/serieAnulada.js'

const router = express.Router()

const { create, read, getSerie, update, cancelSerie, deleteSerie } = controller

router.post('/', validatorSchema(schema), create)
router.get('/', read)
router.get('/:id', getSerie)
router.put('/', validatorSchema(schema), serieAnulada, update)
router.put('/anular', serieAnulada, cancelSerie)
router.delete('/:id', deleteSerie)

export default router