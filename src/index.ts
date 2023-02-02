import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import router from './routers/+routes'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.get('/', async (req: Request, res: Response) => {
  res.status(200).send('✍️(◔◡◔) Express Typescript')
})
app.use(express.static('public', { extensions: ['html'] }))
app.use(router)

export default app
