import { Sequelize } from 'sequelize'
import dbconf from '../config/db.config'
import 'dotenv/config'

const sequelize = new Sequelize(dbconf)

export default sequelize
