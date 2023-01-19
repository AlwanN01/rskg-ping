import ping from 'ping'
import mysql from 'mysql2'

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rskg_ping'
})

conn.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack)
    return
  }
  console.log('MySQL Connected as id ' + conn.threadId)
})
let prevStatus = {}
let failedCount = {}

const hosts = ['192.168.4.6', 'example1.com', 'example2.com', 'example3.com']

function exectQuery(isConnect, host, timestamp) {
  conn.query(`INSERT INTO ping_log (host, isConnect, timestamp) VALUES ('${host}', ${isConnect}, '${timestamp}')`, (err, result) => {
    if (err) console.error('Error insert data: ' + err)
    else console.log(`Timestamp inserted: ${timestamp}`)
  })
}
const checkConnection = () => {
  hosts.forEach(host => {
    ping.promise
      .probe(host)
      .then(res => {
        const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ')
        if (!res.alive && prevStatus[host] !== 'down') {
          prevStatus[host] = 'down'
          // Insert the timestamp into the MySQL database
          exectQuery(false, host, timestamp)
        } else if (res.alive && prevStatus[host] !== 'up') {
          prevStatus[host] = 'up'
          exectQuery(true, host, timestamp)
        }
      })
      .catch(error => {
        console.error(`Error pinging ${host}: ${error}`)
      })
  })
}

setInterval(checkConnection, 3000)
