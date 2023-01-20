import { Sequelize } from 'sequelize'
import dbconf from '../config/db.config'
import 'dotenv/config'

const conn = new Sequelize(dbconf.db, dbconf.user, dbconf.password, {
  host: dbconf.host,
  dialect: dbconf.dialect,
  pool: dbconf.pool,
  define: {
    freezeTableName: true,
    timestamps: false
  }
})

export default conn
