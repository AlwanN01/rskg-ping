'use strict'

import fs from 'fs'
import path from 'path'
import { Sequelize } from 'sequelize'
import sequelize from '../db'
import { seeders } from '../db/seeder/index'
const basename = path.basename(__filename)

// @ts-ignore
const db: DB = {}

const dir = fs.readdirSync(__dirname)
const files = dir.filter(file => file.indexOf('.') !== 0 && file !== basename && (file.slice(-3) === '.js' || file.slice(-3) === '.ts'))
files.forEach(file => {
  const model = require(path.join(__dirname, file)).default
  const name = model.name.charAt(0).toUpperCase() + model.name.slice(1)
  db[name] = model
})

for (const modelName in db) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
}
db.Sequelize = Sequelize
// @ts-ignore
db.sequelize = sequelize
// @ts-ignore
db.seeders = seeders
// @ts-ignore
export default db

declare global {
  interface DB extends Record<string, any> {
    readonly sequelize: typeof sequelize
    Sequelize: typeof Sequelize
    readonly seeders: typeof seeders
  }
}
