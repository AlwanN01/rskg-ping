import s, { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, NonAttribute, Association } from 'sequelize'
import sequelize from '../db'
import { HostSchema } from '../validations/Host.middleware'
import PingLog from './PingLog'

class Host extends Model<InferAttributes<Host>, InferCreationAttributes<Host>> implements HostSchema, HasManyAssoc<PingLog, 'PingLog'> {
  declare id?: CreationOptional<number>
  declare hostName: string
  declare user: string
  declare divisi: string
  declare pingLogs?: NonAttribute<PingLog[]>
  declare static associations: {
    pingLogs: Association<PingLog, Host>
  }
  declare createPingLog: s.HasManyCreateAssociationMixin<PingLog, 'hostId', never>
  declare addPingLog: s.HasManyAddAssociationsMixin<PingLog, number>
  declare hasPingLog: s.HasManyHasAssociationMixin<PingLog, number>
  declare removePingLog: s.HasManyRemoveAssociationMixin<PingLog, number>
  declare countPingLogs: s.HasManyCountAssociationsMixin
  declare getPingLogs: s.HasManyGetAssociationsMixin<PingLog>
  declare setPingLogs: s.HasManySetAssociationsMixin<PingLog, number>
  declare addPingLogs: s.HasManyAddAssociationsMixin<PingLog, number>
  declare hasPingLogs: s.HasManyHasAssociationMixin<PingLog, number>
  declare removePingLogs: s.HasManyRemoveAssociationMixin<PingLog, number>

  static associate(db: DB) {
    Host.hasMany(db.PingLog)
  }
}

Host.init(
  {
    hostName: { type: DataTypes.STRING, allowNull: false, unique: true },
    user: { type: DataTypes.STRING, allowNull: false },
    divisi: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize }
)

export default Host
declare global {
  interface DB {
    readonly Host: typeof Host
  }
}
