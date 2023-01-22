import { Sequelize } from 'sequelize'
import dbconf from '../config/db.config'
import 'dotenv/config'

const sequelize = new Sequelize(dbconf.database!, dbconf.username!, dbconf.password, dbconf)

export default sequelize
