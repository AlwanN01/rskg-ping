import { Sequelize } from 'sequelize'
import dbconf from '../config/db.config'
import 'dotenv/config'
const env = process.env.NODE_ENV || 'development'
const sequelize = new Sequelize(dbconf[env])

export default sequelize
