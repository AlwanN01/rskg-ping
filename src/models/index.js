import { Sequelize } from 'sequelize'
import sequelize from '../db/connection'
import 'dotenv/config'

const db = {}
db.PingLog = require('./PingLog').default
db.Host = require('./Host').default
db.sequelize = sequelize
db.Sequelize = Sequelize
db.queryInterface = sequelize.getQueryInterface()
export default db
