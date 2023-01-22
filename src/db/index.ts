import db from '../models'

db.Host.hasMany(db.PingLog)
db.PingLog.belongsTo(db.Host, { foreignKey: { allowNull: false } })

export default db
