import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, NonAttribute, Association } from 'sequelize'
import sequelize from '../db/connection'
import { HostSchema } from '../middlewares/validations/Host.middleware'
import PingLog from './PingLog'

class Host extends Model<InferAttributes<Host>, InferCreationAttributes<Host>> implements HostSchema {
  declare id?: CreationOptional<number>
  declare host: string
  declare user: string
  declare divisi: string
  declare PingLogs?: NonAttribute<PingLog[]>
  declare static associations: {
    pingLogs: Association<PingLog, Host>
  }
}

Host.init(
  {
    host: { type: DataTypes.STRING, allowNull: false },
    user: { type: DataTypes.STRING, allowNull: false },
    divisi: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize }
)

export default Host
