export const up: MigrationFn = async ({ queryInterface }) => {
  await queryInterface.createDatabase('rskg_ping')
}
export const down: MigrationFn = async params => {}
