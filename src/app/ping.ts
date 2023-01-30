import db from '../models'
import ping from 'ping'

let prevStatus: any = {}
let failedCount: any = {}
export default async function checkConnection() {
  try {
    const hosts = await db.Host.findAll({ attributes: ['id', 'hostName'] })

    for (const { id, hostName } of hosts) {
      const res = await ping.promise.probe(hostName)
      if (!res.alive && prevStatus[hostName] !== 'down') {
        failedCount[hostName] = (failedCount[hostName] ? failedCount[hostName] : 0) + 1
        if (failedCount[hostName] === 3) {
          prevStatus[hostName] = 'down'
          await db.PingLog.create({ hostId: id, isConnect: false })
        }
      } else if (res.alive && prevStatus[hostName] !== 'up') {
        prevStatus[hostName] = 'up'
        failedCount[hostName] = 0
        await db.PingLog.create({ hostId: id, isConnect: true })
      } else {
        failedCount[hostName] = 0
      }
    }
  } catch (error) {
    console.log(error)
  }
}
