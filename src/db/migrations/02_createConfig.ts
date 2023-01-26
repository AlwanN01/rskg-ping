export const up: Migration = async ({ queryInterface, DataTypes }) =>
  await queryInterface.createTable('configs', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        key: 'id',
        model: 'users'
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

export const down: Migration = async ({ queryInterface }) => await queryInterface.dropTable('configs')
