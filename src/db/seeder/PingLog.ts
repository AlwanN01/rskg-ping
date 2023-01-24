export const pingLog = async (db: DB) => {
  const host = await db.Host.findByPk(1)
  const pingLog = await db.PingLog.create({ id: 2, isConnect: true })
  if (host) await pingLog.setHost(host)
  const pingLogs = await db.PingLog.findAll({ include: db.PingLog.associations.host })
  console.log(pingLogs[0])
}
