var app = new Vue({
  el: '#app',
  data: {
    socket: null,
    host: '',
    root_path: '',
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
      this.host = `${host.host_name} ${host.user_name}$`
      this.root_path = host.root_path
    })
    this.$refs.input.focus()
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
      this.clickBlur()
    })
  },
  methods: {
    submitCommand () {
      if (!this.command) {
        this.messages.push( {
          type: 'command',
          data: `${this.host} ${this.command}`
        })
        return
      }
      if (this.command === 'clear') {
        this.messages = []
        this.command = ''
        this.clickBlur()
        return
      }
      this.ready = false
      this.socket.emit('command', this.command)
    },
    clickBlur () {
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  }
})