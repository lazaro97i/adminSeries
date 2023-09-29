import express from 'express'
import controller from '../controllers/series_controller.js'
import schema from '../schemas/series_schema.js'
import validatorSchema from '../middlewares/validatorSchema.js'

const router = express.Router()

const { create, read } = controller

router.post('/', validatorSchema(schema), create)
router.get('/', read)

export default router