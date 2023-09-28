import express from 'express'
import pool from '../config/database.js'

const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

export default router
