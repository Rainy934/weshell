const EVENTS = require('../public/events')

module.exports = [
  {
    name: EVENTS.HOST_INFO,
    listener: function (data, client) {
      console.log(`MSG ${new Date().toISOString()} ${data}`)
      client.emit(EVENTS.HOST_INFO, 'xhy@127.0.0.1 ~$')
    }
  }
]