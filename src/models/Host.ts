import s, { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, NonAttribute, Association } from 'sequelize'
import sequelize from '../db'
import { HostSchema } from '../middlewares/validations/Host.middleware'
import PingLog from './PingLog'

class Host extends Model<InferAttributes<Host>, InferCreationAttributes<Host>> implements HostSchema, HasManyAssoc<PingLog, 'Host'> {
  declare id?: CreationOptional<number>
  declare host: string
  declare user: string
  declare divisi: string
  declare PingLogs?: NonAttribute<PingLog[]>
  declare static associations: {
    pingLogs: Association<PingLog, Host>
  }

  declare createHost: s.HasManyCreateAssociationMixin<PingLog, 'id', never>
  declare addHost: s.HasManyAddAssociationsMixin<PingLog, number>
  declare hasHost: s.HasManyHasAssociationMixin<PingLog, number>
  declare removeHost: s.HasManyRemoveAssociationMixin<PingLog, number>
  declare countHosts: s.HasManyCountAssociationsMixin
  declare getHosts: s.HasManyGetAssociationsMixin<PingLog>
  declare setHosts: s.HasManySetAssociationsMixin<PingLog, number>
  declare addHosts: s.HasManyAddAssociationsMixin<PingLog, number>
  declare hasHosts: s.HasManyHasAssociationMixin<PingLog, number>
  declare removeHosts: s.HasManyRemoveAssociationMixin<PingLog, number>
  static associate(db: DB) {
    Host.hasMany(db.PingLog, { foreignKey: { allowNull: false } })
  }
}

Host.init(
  {
    host: { type: DataTypes.STRING, allowNull: false, unique: true },
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
