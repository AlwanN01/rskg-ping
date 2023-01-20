import type { PoolOptions } from 'sequelize'
const dbconf = {
  host: process.env.DB_HOST,
  db: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: 'mysql' as const,
  pool: <PoolOptions>{
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

export default dbconf
