import express from 'express'
import errorHandler from '../middlewares/errorHandler'

const router = express.Router()

router.use(errorHandler)
export default router
