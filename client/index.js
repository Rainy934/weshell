var app = new Vue({
  el: '#app',
  data: {
    socket: null,
    host: '',
    command: '',
    messages: [],
    ready: true
  },
  created () {
    this.socket = io('http://localhost:931')
  },
  mounted () {
    this.socket.emit('host_info', 'hello world')
    this.socket.on('host_info', (host) => {
      this.host = host
    })
    this.$refs.input.focus()
  },
  methods: {
    submitCommand () {
      this.ready = false
      this.socket.emit('command', this.command)
      this.socket.on('command', (res) => {
        res.data = res.data.replace(/\n/g, '<br>')
        res.data = res.data.replace(/\s/g, '&nbsp')
        this.messages.push( {
          type: 'command',
          data: `${this.host} ${this.command}`
        })
        this.messages.push(res)
        this.command = ''
        this.ready = true
      })
    },
    clickBlur () {
      this.$refs.input.focus()
    }
  }
})