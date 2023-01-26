import s, { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute, Association } from 'sequelize'
import sequelize from '../db'
import Host from './Host'
import { PingLogSchema } from '../middlewares/validations/PingLog.middle'

class PingLog extends Model<InferAttributes<PingLog>, InferCreationAttributes<PingLog>> implements BelongsToAssoc<Host, 'host'>, PingLogSchema {
  declare id?: CreationOptional<number>
  declare hostId: ForeignKey<Host['id']>
  declare host: NonAttribute<Host>
  declare isConnect: boolean
  declare createdAt?: CreationOptional<number>

  declare createHost: s.BelongsToCreateAssociationMixin<Host>
  declare getHost: s.BelongsToGetAssociationMixin<Host>
  declare setHost: s.BelongsToSetAssociationMixin<Host, number>

  declare static associations: {
    host: Association<Host, PingLog>
  }
  static associate(db: DB) {
    PingLog.belongsTo(db.Host)
  }
}

PingLog.init(
  {
    hostId: DataTypes.INTEGER,
    isConnect: { type: DataTypes.BOOLEAN, allowNull: false }
  },
  {
    sequelize,
    updatedAt: false,
    modelName: 'pingLog'
  }
)

export default PingLog
declare global {
  interface DB {
    readonly PingLog: typeof PingLog
  }
}
