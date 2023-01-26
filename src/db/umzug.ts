import { Umzug } from 'umzug'
import umzugConfig from '../config/umzug.config'
import db from '../models'
export const migrate = new Umzug(umzugConfig({ sequelize: db.sequelize, db }))
export const seed = new Umzug(umzugConfig({ sequelize: db.sequelize, db, isSeed: true }))

interface Params {
  queryInterface: import('sequelize').QueryInterface
  DataTypes: typeof import('sequelize').DataTypes
  db: DB
}
declare global {
  type MigrationFn = (params: Params) => Promise<any>
}
