import s, { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, NonAttribute, Association, ForeignKey } from 'sequelize'
import sequelize from '../db'
import type Host from './Host'
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> implements BelongsToAssoc<Host, 'host'> {
  declare id?: number
  declare name: string
  declare age: number
  declare hostId: ForeignKey<Host['id']>
  declare createHost: s.BelongsToCreateAssociationMixin<Host>
  declare getHost: s.BelongsToGetAssociationMixin<Host>
  declare setHost: s.BelongsToSetAssociationMixin<Host, number>
  static associate(db: DB): void {
    User.belongsTo(db.Host)
  }
}

User.init(
  {
    hostId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
  },
  { sequelize, modelName: 'user' }
)

export default User
declare global {
  interface DB {
    readonly User: typeof User
  }
}
