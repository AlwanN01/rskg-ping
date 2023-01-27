import express from 'express'
import errorHandler from '../middlewares/errorHandler'
import hostRouter from './Host.route'

const router = express.Router()
router.use('/host', hostRouter)
router.use(errorHandler)
export default router
