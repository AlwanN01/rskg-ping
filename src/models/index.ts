// @ts-nocheck
import fs from 'fs'
import path from 'path'
import sequelize from '../db'
const basename = path.basename(__filename)

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
db.sequelize = sequelize

export default db

declare global {
  interface DB {
    readonly sequelize: typeof sequelize
  }
}
