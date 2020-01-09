const EVENTS = require('../public/events')
const { spawn } = require('child_process')

module.exports = [
  {
    name: EVENTS.HOST_INFO,
    listener: function (data, client) {
      console.log(`MSG ${new Date().toISOString()} ${data}`)
      client.emit(EVENTS.HOST_INFO, 'xhy@127.0.0.1 ~$')
    }
  },
  {
    name: EVENTS.COMMAND,
    listener: async function (data, client) {
      console.log(`MSG ${new Date().toISOString()} ${data}`)
      let res = await execute(data)
      client.emit(EVENTS.COMMAND, res)
    }
  }
]


function execute (command, args = []) {
  return new Promise(function(reslove, reject) {
    const res = spawn(command, args)
    res.stdout.on('data', (data) => {
      reslove({
        type: 'normal',
        data: data.toString()
      })
    })
    res.stderr.on('data', (data) => {
      reslove({
        type: 'error',
        data: data.toString()
      })
    })
  })
}