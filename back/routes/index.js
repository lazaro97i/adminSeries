import express from 'express'
import series from './series_routes.js'

const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.use('/series', series)

export default router
