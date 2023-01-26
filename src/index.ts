import 'dotenv/config'
import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import router from './routers/+routes'
import db from './models'
import { migrate, seed } from './db/umzug'
const app = express()
const port = process.env.PORT || 3000

;(async () => {
  await seed.down({ to: 0 }) // yarn seed down --to 0
  await migrate.down({ to: 0 }) // yarn migrate down --to 0
  await db.sequelize.sync({ force: true })
  await migrate.up() // yarn migrate up
  await seed.up() // yarn seed up
})()

app.use(express.json())
app.use(cookieParser())
app.get('/', async (req: Request, res: Response) => {
  // const ping = await PingLog.create({ hostId: 1, isConnect: false })
  // const host = await Host.create({ host: 'exaddmple.com', divisi: 'IT', user: 'alwan' })
  res.status(200).send('✍️(◔◡◔) Express Typescript')
})
app.use(router)
app.listen(port, () => {
  console.log(`Running on Port ${port}`)
})
