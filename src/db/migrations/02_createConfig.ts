export const up: MigrationFn = async ({ queryInterface, DataTypes }) =>
  await queryInterface.createTable('configs', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'users'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  })

export const down: MigrationFn = async ({ queryInterface }) => await queryInterface.dropTable('configs')
