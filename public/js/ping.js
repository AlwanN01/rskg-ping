const socket = io()

const listPing = document.querySelector('#list-ping')

// let listData = ''
// socket.on('ping', data => {
//   listData = ''
//   data.forEach(item => {
//     listData += /*html*/ `
//     <li>
//       <span class="name">${item.name} : </span>
//       <span class="host">${item.host} | </span>
//       <span class="status"> ${item.active ? 'Active' : 'Not Active'}</span>
//     </li>
//     `
//   })
//   listPing.innerHTML = listData
// })
// fetch('/host')
//   .then(res => res.json())
//   .then(res => {
//     res.data.forEach(hostName => {
//       socket.on(hostName, data => {
//         listPing.innerHTML = hostName + ' ' + data
//       })
//     })
//   })
socket.on('192.168.4.29', data => {
  listPing.innerHTML = '192.168.4.29' + ' ' + data
})
