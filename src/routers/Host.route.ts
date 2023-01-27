import express from 'express'
import { createHost, searchHost } from '../controllers/Host.control'

const hostRouter = express.Router()
hostRouter.get('/', searchHost)
hostRouter.post('/', createHost)
export default hostRouter
