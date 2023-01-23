import db from '../models'
export { seeders } from './seeder'

db.Host.hasMany(db.PingLog)
db.PingLog.belongsTo(db.Host, { foreignKey: { allowNull: false } })

export default db
export type DB = typeof db
