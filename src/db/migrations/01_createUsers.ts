export const up: Migration = async ({ queryInterface, DataTypes }) =>
  await queryInterface.createTable('users', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    hostId: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'hosts'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  })

export const down: Migration = async ({ queryInterface }) => await queryInterface.dropTable('users')
