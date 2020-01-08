const server = require('http').createServer();

const io = require('socket.io')(server);

const events = require('./event')

const clientArr = []

io.on('connection', client => {
  clientArr.push(client)
  console.log(`客户端(${client.id}) - 已连接`)

  client.on('disconnect', () => {
    let n = clientArr.indexOf(client)
    clientArr.splice(n, 1)
    console.log(`客户端(${client.id}) - 断开连接`)
  })

  registerEvent(client, events)
})

server.listen(931)


function registerEvent (client, events = []) {
  if (!client) return
  events.forEach((event) => {
    client.on(event.name, event.listener)
  })
}