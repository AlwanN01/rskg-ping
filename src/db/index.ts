require('ts-node/register')
import { Sequelize, DataTypes } from 'sequelize'
import process from 'process'
import { Umzug, SequelizeStorage } from 'umzug'
import dbconf from '../config/db.config'
import 'dotenv/config'
const env = process.env.NODE_ENV || 'development'
const sequelize = new Sequelize(dbconf[env])
export default sequelize

export const umzug = new Umzug({
  migrations: {
    glob: process.env.NODE_ENV == 'development' ? 'src/db/migrations/*.ts' : '',
    resolve: ({ name, path, context }) => {
      const migration = require(path!)
      return {
        name,
        up: async () => migration.up({ queryInterface: context, DataTypes }),
        down: async () => migration.down({ queryInterface: context, DataTypes })
      }
    }
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console
})
type Params = { queryInterface: import('sequelize').QueryInterface; DataTypes: typeof import('sequelize').DataTypes }
declare global {
  type Migration = (params: Params) => Promise<void>
}
