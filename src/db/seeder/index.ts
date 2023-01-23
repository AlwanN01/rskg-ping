import { host } from './host.seed'

export const seeders = async (db: DB) => {
  await host(db.Host)
}
