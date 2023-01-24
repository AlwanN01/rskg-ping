import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  Model,
  ModelDefined,
  Optional,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey
} from 'sequelize'

const sequelize = new Sequelize('mysql://root:@localhost:3306/test', { define: { underscored: true } })

// 'projects' is excluded as it's not an attribute, it's an association.
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>
  declare name: string
  declare preferredName: string | null // for nullable fields

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getProjects: HasManyGetAssociationsMixin<Project> // Note the null assertions!
  declare addProject: HasManyAddAssociationMixin<Project, number>
  declare addProjects: HasManyAddAssociationsMixin<Project, number>
  declare setProjects: HasManySetAssociationsMixin<Project, number>
  declare removeProject: HasManyRemoveAssociationMixin<Project, number>
  declare removeProjects: HasManyRemoveAssociationsMixin<Project, number>
  declare hasProject: HasManyHasAssociationMixin<Project, number>
  declare hasProjects: HasManyHasAssociationsMixin<Project, number>
  declare countProjects: HasManyCountAssociationsMixin
  declare createSolo: HasManyCreateAssociationMixin<Project, 'ownerId'>

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare projects?: NonAttribute<Project[]> // Note this is optional since it's only populated when explicitly requested in code

  // getters that are not attributes should be tagged using NonAttribute
  // to remove them from the model's Attribute Typings.
  get fullName(): NonAttribute<string> {
    return this.name
  }

  // declare static associations: {
  //   projects: Association<User, Project>
  // }
}

class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>

  // foreign keys are automatically added by associations methods (like Project.belongsTo)
  // by branding them using the `ForeignKey` type, `Project.init` will know it does not need to
  // display an error if ownerId is missing.
  declare ownerId: ForeignKey<User['id']>
  declare name: string

  // `owner` is an eagerly-loaded association.
  // We tag it as `NonAttribute`
  declare owner?: NonAttribute<User>

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>
}

class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
  declare userId: ForeignKey<User['id']>
  declare address: string

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'projects'
  }
)

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    preferredName: {
      type: new DataTypes.STRING(128),
      allowNull: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    tableName: 'users',
    sequelize // passing the `sequelize` instance is required
  }
)

Address.init(
  {
    address: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    tableName: 'address',
    sequelize // passing the `sequelize` instance is required
  }
)

// Here we associate which actually populates out pre-declared `association` static and other methods.
User.hasMany(Project, { as: { singular: 'solo', plural: 'squad' } })

Address.belongsTo(User, { targetKey: 'id' })
User.hasOne(Address, { sourceKey: 'id' })
Project.belongsTo(User, { targetKey: 'id' })
async function doStuffWithUser() {
  const newUser = await User.create({
    name: 'Johnny',
    preferredName: 'John'
  })
  console.log(newUser.id, newUser.name, newUser.preferredName)

  const project = await newUser.createSolo({
    name: 'first!'
  })

  const ourUser = await User.findByPk(1, {
    include: [User.associations.squad],
    rejectOnEmpty: true // Specifying true here removes `null` from the return type!
  })

  // Note the `!` null assertion since TS can't know if we included
  // the model or not
  console.log(project)
}

;(async () => {
  await sequelize.sync({ force: true })
  await doStuffWithUser()
})()
