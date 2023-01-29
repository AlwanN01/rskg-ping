export const up: MigrationFn = async ({ db }) => {
  const host = await db.Host.findOne({ where: { hostName: 'example1.com' } })
  const pingLog = await db.PingLog.create({ isConnect: true })
  if (host) await pingLog.setHost(host)
  console.log(pingLog)
}
export const down: MigrationFn = async ({ db }) => {
  await db.PingLog.destroy({ where: {} })
  await db.sequelize.query(`ALTER TABLE rskg_ping.ping_logs 
  AUTO_INCREMENT=1;
  `)
}
