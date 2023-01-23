export const pingLog = async (db: DB) => {
  const host = await db.Host.findByPk(1)
  const pingLog = await db.PingLog.create({ id: 2, isConnect: true })
  if (host) console.log(await pingLog.setHost(host))
}
