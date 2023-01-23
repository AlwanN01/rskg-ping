import { host } from './host.seed'
import { pingLog } from './PingLog'

export const seeders = async (db: DB) => {
  await host(db.Host)
  await pingLog(db)
}
