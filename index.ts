import 'dotenv/config'
import http from 'http'
import app from './src'
import Ping from './src/app/ping'
import db from './src/models'
import { migrate, seed } from './src/db/umzug'

const port = process.env.PORT || 3001
const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
  ;(async () => {
    await seed.down({ to: 0 }) // yarn seed down --to 0
    await migrate.down({ to: 0 }) // yarn migrate down --to 0
    await db.sequelize.sync({ force: true })
    await migrate.up() // yarn migrate up
    await seed.up() // yarn seed up
  })()
})
Ping(server)
