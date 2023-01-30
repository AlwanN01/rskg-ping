import express from 'express'
import { createHost, findAllHost, findOneHost, updateHost } from '../controllers/Host.control'

const hostRouter = express.Router()
hostRouter.get('/:id', findOneHost)
hostRouter.get('/', findAllHost)
hostRouter.post('/', createHost)
hostRouter.patch('/', updateHost)
export default hostRouter
