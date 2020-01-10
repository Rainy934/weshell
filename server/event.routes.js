const EVENTS = require('../public/events')
const { spawn } = require('child_process')
const os = require('os')
const minimist = require('minimist')

module.exports = [
  {
    name: EVENTS.HOST_INFO,
    listener: function (data, client) {
      console.log(`HOSTINFO ${new Date().toISOString()} ${data}`)
      let host_name = os.hostname()
      let root_path = os.homedir()
      let user_name = os.homedir().split('/').pop()
      client.emit(EVENTS.HOST_INFO, {
        host_name,
        user_name,
        root_path
      })
    }
  },
  {
    name: EVENTS.COMMAND,
    listener: async function (data, client) {
      let commands = data.split(' ')
      let command = commands[0]
      let args = commands.slice(1)
      console.log(`COMMAND ${new Date().toISOString()} ${data}`)
      let res = await execute(command, args)
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
    res.on('error', (data) => {
      reslove({
        type: 'error',
        data: data.toString()
      })
    })
  })
}