'use strict'

import fs from 'fs'
import path from 'path'
import { Sequelize } from 'sequelize'
import sequelize from '../db/connection'
import { seeders } from '../db/seeder'
const basename = path.basename(__filename)
// @ts-ignore
const db: DB = {}
fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && (file.slice(-3) === '.js' || file.slice(-3) === '.ts')
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file)).default
    db[model.name] = model
  })

for (const modelName in db) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
}
// @ts-ignore
db.sequelize = sequelize
db.Sequelize = Sequelize
// @ts-ignore
db.seeders = seeders

export default db

declare global {
  interface DB extends Record<string, any> {
    readonly sequelize: typeof sequelize
    Sequelize: typeof Sequelize
    readonly seeders: typeof seeders
  }
}
