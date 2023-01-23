import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute } from 'sequelize'
import sequelize from '../db/connection'
import Host from './Host'
// import { PingLogSchema } from '../../middlewares/validations/PingLog.middle'

class PingLog extends Model<InferAttributes<PingLog>, InferCreationAttributes<PingLog>> {
  declare id?: CreationOptional<number>
  declare hostId: ForeignKey<Host['id']>
  declare host: NonAttribute<Host>
  declare isConnect: boolean
  declare createdAt?: CreationOptional<number>
}

PingLog.init(
  {
    isConnect: { type: DataTypes.BOOLEAN, allowNull: false }
  },
  {
    sequelize,
    updatedAt: false
  }
)

export default PingLog

declare global {
  interface DBALL {
    PingLog: typeof PingLog
  }
}
