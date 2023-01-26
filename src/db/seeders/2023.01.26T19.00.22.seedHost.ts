export const up: MigrationFn = async ({ db: { Host } }) => {
  const host = await Host.create({ hostName: 'example1.com', user: 'alwan', divisi: 'IT' })
  await host.createPingLog({ isConnect: false })
}
export const down: MigrationFn = async ({ db }) => {
  await db.Host.destroy({ where: {} })
  await db.sequelize.query(`ALTER TABLE rskg_ping.hosts 
  AUTO_INCREMENT=1;
  `)
}
