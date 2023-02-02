import db from '../models'
import ping from 'ping'
import { Server } from 'socket.io'
import type { Server as HttpServer } from 'http'
export let prevStatus: any = {}
let failedCount: any = {}
// const getData = () => prevStatus

export default function Ping(server: HttpServer) {
  const io = new Server(server, { cors: { origin: 'http://localhost:3000' } })
  const emit = io.emit.bind(io)
  async function checkConnection() {
    try {
      const hosts = await db.Host.findAll({ attributes: ['id', 'hostName'] })
      for (const { id, hostName } of hosts) {
        // if (!prevStatus.hasOwnProperty(hostName)) delete prevStatus[hostName]
        const res = await ping.promise.probe(hostName)
        if (!res.alive && prevStatus[hostName]?.status !== 'down') {
          failedCount[hostName] = (failedCount[hostName] ? failedCount[hostName] : 0) + 1
          if (failedCount[hostName] === 3) {
            prevStatus[hostName] = { status: 'down', updatedAt: new Date() }
            await db.PingLog.create({ hostId: id, isConnect: false })
            emit(hostName, 'down')
            console.log('down')

            // _hosts[hostName] = { hostName, isConnect: false }
          }
        } else if (res.alive && prevStatus[hostName]?.status !== 'up') {
          prevStatus[hostName] = { status: 'up', updatedAt: new Date() }
          failedCount[hostName] = 0
          await db.PingLog.create({ hostId: id, isConnect: true })
          emit(hostName, 'up')
          console.log('up')

          // _hosts[hostName] = { hostName, isConnect: true }
        } else {
          failedCount[hostName] = 0
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  setInterval(checkConnection, 3000)
  io.on('connection', socket => {
    setTimeout(() => {
      for (const host in prevStatus) {
        socket.emit(host, prevStatus[host])
      }
    }, 3000)
  })
}
