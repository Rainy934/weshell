module.exports = [
  {
    name: 'msg',
    listener: function (msg) {
      console.log(`MSG ${new Date().toISOString()} ${msg}`)
    }
  }
]