import db from '../models'
import ping from 'ping'
import { Server } from 'socket.io'
import type { Server as HttpServer } from 'http'
export let prevStatus: any = {}
let failedCount: any = {}
// let _hosts: any = {}
// const getData = () => prevStatus

export default function Ping(server: HttpServer) {
  const io = new Server(server)
  const emit = io.emit.bind(io)
  async function checkConnection() {
    console.log(prevStatus)

    try {
      const hosts = await db.Host.findAll({ attributes: ['id', 'hostName'] })
      for (const statusHost in prevStatus) {
        console.log(hosts.hasOwnProperty(statusHost))
      }
      for (const { id, hostName } of hosts) {
        // if (!prevStatus.hasOwnProperty(hostName)) delete prevStatus[hostName]
        const res = await ping.promise.probe(hostName)
        if (!res.alive && prevStatus[hostName] !== 'down') {
          failedCount[hostName] = (failedCount[hostName] ? failedCount[hostName] : 0) + 1
          if (failedCount[hostName] === 3) {
            prevStatus[hostName] = 'down'
            await db.PingLog.create({ hostId: id, isConnect: false })
            emit(hostName, 'down')
            // _hosts[hostName] = { hostName, isConnect: false }
          }
        } else if (res.alive && prevStatus[hostName] !== 'up') {
          prevStatus[hostName] = 'up'
          failedCount[hostName] = 0
          await db.PingLog.create({ hostId: id, isConnect: true })
          emit(hostName, 'up')
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
    for (const host in prevStatus) {
      socket.emit(host, prevStatus[host])
    }
  })
}
