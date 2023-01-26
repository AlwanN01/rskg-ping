export const up: MigrationFn = async ({ db }) => await db.User.sync({ force: true })
export const down: MigrationFn = async ({ queryInterface }) => await queryInterface.dropTable('users')
