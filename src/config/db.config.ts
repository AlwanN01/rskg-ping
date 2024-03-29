import 'dotenv/config'
import { Op, Options } from 'sequelize'
interface Config {
  development: Options
  production: Options
}
const dbconf: Config = {
  development: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    schema: 'public',
    port: process.env.DB_PORT,
    timezone: '+07:00',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      underscored: true
    },
    logging: false,
    operatorsAliases: {
      and: Op.and,
      or: Op.or
    }
  },
  production: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql',
    timezone: '+07:00',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      underscored: true
    },
    logging: false
  }
}

export default dbconf
