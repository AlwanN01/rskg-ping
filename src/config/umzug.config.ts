import 'dotenv/config'
import { DataTypes, Sequelize } from 'sequelize'
import { SequelizeStorage, UmzugOptions } from 'umzug'

interface Params {
  sequelize: Sequelize
  db: DB
  isSeed?: boolean
}
const umzugConfig = ({ sequelize, db, isSeed = false }: Params): UmzugOptions<import('sequelize').QueryInterface> => ({
  migrations: {
    glob: process.env.NODE_ENV == 'development' ? `src/db/${isSeed ? 'seeders' : 'migrations'}/*{.ts,.js}` : '',
    resolve: ({ name, path, context }) => {
      const migration = require(path!)
      return {
        name,
        up: async () => migration.up({ queryInterface: context, DataTypes, db }),
        down: async () => migration.down({ queryInterface: context, DataTypes, db })
      }
    }
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, modelName: isSeed ? 'sequelize_meta_seed' : 'sequelize_meta_migrate' }),
  logger: console
})

export default umzugConfig
